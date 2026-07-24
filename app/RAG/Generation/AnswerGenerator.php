<?php

declare(strict_types=1);

namespace App\RAG\Generation;

use App\AI\Contracts\LlmProviderInterface;
use App\DTO\GenerationResult;
use App\DTO\HybridRetrievalResult;
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
                config('rag.messages.no_answer', 'Informasi tersebut tidak ditemukan dalam basis pengetahuan.'),
                [],
                $retrieval->gateResult->topScore,
                $retrieval->latencyMs,
                $traceId
            );
        }

        $sanitizedQuery = $this->injectionDefense->sanitize($query);
        $sanitizedResults = $this->injectionDefense->sanitizeChunks($retrieval->results);
        
        $messages = $this->promptBuilder->build($sanitizedQuery, $retrieval->parentChunks, $sanitizedResults);
        
        $llmResponse = $this->llm->chat($messages);
        $answerText = $llmResponse->content;
        
        $citations = $this->citationFormatter->extractCitations($answerText, $sanitizedResults);

        Log::channel('rag')->info('Answer generated', [
            'trace_id' => $traceId,
            'citations_count' => count($citations)
        ]);

        return new GenerationResult(
            $answerText,
            $citations,
            $retrieval->gateResult->topScore,
            $retrieval->latencyMs,
            $traceId
        );
    }
}