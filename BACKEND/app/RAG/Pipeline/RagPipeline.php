<?php

declare(strict_types=1);

namespace App\RAG\Pipeline;

use App\RAG\Retrieval\HybridRetriever;
use App\RAG\Generation\AnswerGenerator;
use App\DTO\GenerationResult;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class RagPipeline
{
    public function __construct(
        private readonly HybridRetriever $retriever,
        private readonly AnswerGenerator $generator
    ) {}

    public function query(string $query, ?string $documentVersionId = null): GenerationResult
    {
        $traceId = Str::uuid()->toString();
        
        if (!$documentVersionId) {
            $doc = DB::table('document_versions')->where('status', 'completed')->orderByDesc('created_at')->first();
            $documentVersionId = $doc ? $doc->id : 'default';
        }

        $retrievalResult = $this->retriever->retrieve($query, $documentVersionId, $traceId);
        $generationResult = $this->generator->generate($query, $retrievalResult, $traceId);

        DB::table('retrieval_logs')->insert([
            'id' => Str::uuid()->toString(),
            'trace_id' => $traceId,
            'query' => $query,
            'generated_answer' => $generationResult->answer,
            'confidence_score' => $generationResult->confidenceScore,
            'passed_gate' => $retrievalResult->gateResult->passed,
            'latency_ms' => (int)$generationResult->retrievalLatencyMs,
            'created_at' => now(),
        ]);

        return $generationResult;
    }
}