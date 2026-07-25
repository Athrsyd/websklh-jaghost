<?php

declare(strict_types=1);

namespace App\RAG\Retrieval;

use App\Repositories\ChunkRepository;
use App\DTO\HybridRetrievalResult;
use Illuminate\Support\Facades\Log;

class HybridRetriever
{
    public function __construct(
        private readonly DenseVectorSearcher $denseSearcher,
        private readonly SparseTextSearcher $sparseSearcher,
        private readonly ReciprocalRankFusion $fusion,
        private readonly CrossEncoderReranker $reranker,
        private readonly ConfidenceGate $gate,
        private readonly ChunkRepository $chunkRepository
    ) {}

    /**
     * @param string $query
     * @param string $documentVersionId
     * @param string $traceId
     * @return HybridRetrievalResult
     */
    public function retrieve(string $query, string $documentVersionId, string $traceId): HybridRetrievalResult
    {
        $startTime = microtime(true);

        $dense = $this->denseSearcher->search($query, $documentVersionId);
        $sparse = $this->sparseSearcher->search($query, $documentVersionId);
        
        $fused = $this->fusion->fuse($dense, $sparse);
        
        $gateResult = $this->gate->gate($fused);
        
        $reranked = [];
        $parentChunks = [];
        
        if ($gateResult->passed) {
            $reranked = $this->reranker->rerank($query, $gateResult->filteredResults);
            
            $parentIds = array_filter(array_map(fn($r) => $r->metadata['parent_chunk_id'] ?? null, $reranked));
            if (!empty($parentIds)) {
                $parentChunks = $this->chunkRepository->findByIds(array_values(array_unique($parentIds)));
            }
        }

        $latency = (microtime(true) - $startTime) * 1000;

        Log::channel('rag')->info('Retrieval completed', [
            'trace_id' => $traceId,
            'query' => $query,
            'dense_count' => count($dense),
            'sparse_count' => count($sparse),
            'fused_count' => count($fused),
            'reranked_count' => count($reranked),
            'latency_ms' => $latency,
            'passed' => $gateResult->passed,
            'reason' => $gateResult->reason
        ]);

        return new HybridRetrievalResult(
            $reranked,
            $parentChunks,
            $gateResult,
            count($dense),
            count($sparse),
            count($fused),
            count($reranked),
            $latency,
            $traceId
        );
    }
}