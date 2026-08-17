<?php

declare(strict_types=1);

namespace App\RAG\Generation;

use App\AI\Contracts\LlmProviderInterface;
use App\DTO\GenerationResult;
use App\DTO\HybridRetrievalResult;
use App\RAG\Tools\NavigationTool;
use App\RAG\Tools\SpotlightTool;
use App\RAG\Tools\ComputerActionTool;
use Illuminate\Support\Facades\Log;

class AnswerGenerator
{
    public function __construct(
        private readonly LlmProviderInterface $llm,
        private readonly PromptBuilder $promptBuilder,
        private readonly PromptInjectionDefense $injectionDefense,
        private readonly CitationFormatter $citationFormatter
    ) {}

    public function generate(
        string $query,
        HybridRetrievalResult $retrieval,
        string $traceId,
        array $pageContext = []
    ): GenerationResult {
        $sanitizedQuery = $this->injectionDefense->sanitize($query);
        $sanitizedResults = $this->injectionDefense->sanitizeChunks($retrieval->results);
        
        $messages = $this->promptBuilder->build(
            $sanitizedQuery,
            $retrieval->parentChunks,
            $sanitizedResults,
            $pageContext
        );
        
        // Tool definitions for OpenAI/Gemini function calling
        $tools = [
            NavigationTool::getDefinition(),
            SpotlightTool::getDefinition(),
            ComputerActionTool::getDefinition(),
        ];

        $llmResponse = $this->llm->chat($messages, 0.1, 2048, $tools);
        $answerText = trim($llmResponse->content);
        $toolCalls = $llmResponse->toolCalls;
        $finishReason = $llmResponse->finishReason;

        // Process and enrich tool calls if present
        if (!empty($toolCalls)) {
            $enrichedToolCalls = [];
            $defaultAnswerParts = [];

            foreach ($toolCalls as $call) {
                $fn = $call['function'] ?? [];
                $fnName = $fn['name'] ?? '';
                $argsRaw = $fn['arguments'] ?? '{}';
                $args = is_array($argsRaw) ? $argsRaw : json_decode((string)$argsRaw, true);
                if (!is_array($args)) {
                    $args = [];
                }

                if ($fnName === 'navigate_to_page' && !empty($args['page'])) {
                    $resolved = NavigationTool::resolve($args['page'], $args['section'] ?? null);
                    $args['path'] = $resolved['path'];
                    $args['title'] = $resolved['title'];
                    $args['full_url'] = $resolved['full_url'];

                    $call['function']['arguments'] = json_encode($args, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
                    $defaultAnswerParts[] = "Baik, saya mengarahkan Anda ke halaman **{$resolved['title']}** ({$resolved['path']}).";
                } elseif ($fnName === 'spotlight_sections' && !empty($args['targets'])) {
                    $call['function']['arguments'] = json_encode($args, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
                    if (empty($answerText)) {
                        $defaultAnswerParts[] = "Saya telah menandai bagian penting di halaman ini untuk Anda.";
                    }
                } elseif ($fnName === 'computer_action' && !empty($args['action'])) {
                    $call['function']['arguments'] = json_encode($args, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
                    if (empty($answerText)) {
                        $act = $args['action'];
                        $target = $args['target'] ?? '';
                        if ($act === 'scroll_down' || $act === 'scroll_bottom') {
                            $defaultAnswerParts[] = "Baik, saya gulirkan halaman ke bawah untuk Anda.";
                        } elseif ($act === 'scroll_up' || $act === 'scroll_top') {
                            $defaultAnswerParts[] = "Baik, saya gulirkan halaman ke atas.";
                        } elseif ($act === 'scroll_to') {
                            $defaultAnswerParts[] = "Baik, saya arahkan tampilan ke bagian {$target}.";
                        } elseif ($act === 'click') {
                            $defaultAnswerParts[] = "Baik, saya klik {$target} untuk Anda.";
                        }
                    }
                }

                $enrichedToolCalls[] = $call;
            }

            $toolCalls = $enrichedToolCalls;

            if (empty($answerText) && !empty($defaultAnswerParts)) {
                $answerText = implode("\n\n", $defaultAnswerParts);
            }
        }

        // If no tool call, no context, and empty answer, provide standard polite fallback
        if (empty($answerText) && empty($toolCalls)) {
            $answerText = config('rag.confidence.no_answer_message', 'Maaf, informasi tersebut tidak ditemukan dalam basis pengetahuan SMKN 26 Jakarta.');
        }
        
        $citations = $this->citationFormatter->extractCitations($answerText, $sanitizedResults);

        Log::channel('rag')->info('Answer generated', [
            'trace_id' => $traceId,
            'citations_count' => count($citations),
            'has_tool_calls' => !empty($toolCalls)
        ]);

        return new GenerationResult(
            $answerText,
            $citations,
            $retrieval->gateResult->topScore,
            $retrieval->latencyMs,
            $traceId,
            $toolCalls,
            $finishReason
        );
    }
}