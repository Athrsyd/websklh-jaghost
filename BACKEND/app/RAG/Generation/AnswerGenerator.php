<?php

declare(strict_types=1);

namespace App\RAG\Generation;

use App\AI\Contracts\LlmProviderInterface;
use App\DTO\GenerationResult;
use App\DTO\HybridRetrievalResult;
use App\RAG\Tools\NavigationTool;
use Illuminate\Support\Facades\Log;

class AnswerGenerator
{
    public function __construct(
        private readonly LlmProviderInterface $llm,
        private readonly PromptBuilder $promptBuilder,
        private readonly PromptInjectionDefense $injectionDefense,
        private readonly CitationFormatter $citationFormatter
    ) {}

    public function generate(string $query, HybridRetrievalResult $retrieval, string $traceId): GenerationResult
    {
        $sanitizedQuery = $this->injectionDefense->sanitize($query);
        $sanitizedResults = $this->injectionDefense->sanitizeChunks($retrieval->results);
        
        $messages = $this->promptBuilder->build($sanitizedQuery, $retrieval->parentChunks, $sanitizedResults);
        
        // Navigation tool definition for OpenAI/Gemini function calling
        $tools = [
            NavigationTool::getDefinition()
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
                }

                $enrichedToolCalls[] = $call;
            }

            $toolCalls = $enrichedToolCalls;

            // If the LLM returned no textual message alongside the tool call, provide the friendly navigation message
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