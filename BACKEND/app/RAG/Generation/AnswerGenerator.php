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
        if (!$retrieval->gateResult->passed) {
            return new GenerationResult(
                config('rag.confidence.no_answer_message', 'Informasi tersebut tidak ditemukan dalam basis pengetahuan.'),
                [],
                $retrieval->gateResult->topScore,
                $retrieval->latencyMs,
                $traceId,
                null,
                'stop'
            );
        }

        $sanitizedQuery = $this->injectionDefense->sanitize($query);
        $sanitizedResults = $this->injectionDefense->sanitizeChunks($retrieval->results);
        
        $messages = $this->promptBuilder->build($sanitizedQuery, $retrieval->parentChunks, $sanitizedResults);
        
        // Sediakan NavigationTool definition ke LLM
        $tools = [
            NavigationTool::getDefinition()
        ];

        $llmResponse = $this->llm->chat($messages, 0.1, 2048, $tools);
        $answerText = $llmResponse->content;
        $toolCalls = $llmResponse->toolCalls;
        $finishReason = $llmResponse->finishReason;
        
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