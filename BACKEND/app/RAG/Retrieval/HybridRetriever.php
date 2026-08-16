<?php

declare(strict_types=1);

namespace App\RAG\Retrieval;

use App\Repositories\ChunkRepository;
use App\DTO\HybridRetrievalResult;
use App\DTO\ConfidenceGateResult;
use Illuminate\Support\Facades\Log;
use Throwable;

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
        $dense = [];
        $sparse = [];
        $fused = [];
        $reranked = [];
        $parentChunks = [];
        $gateResult = null;

        try {
            $dense = $this->denseSearcher->search($query, $documentVersionId);
            $sparse = $this->sparseSearcher->search($query, $documentVersionId);
            
            $fused = $this->fusion->fuse($dense, $sparse);
            $gateResult = $this->gate->gate($fused);
            
            if ($gateResult->passed) {
                $reranked = $this->reranker->rerank($query, $gateResult->filteredResults);
                
                $parentIds = array_filter(array_map(fn($r) => $r->metadata['parent_chunk_id'] ?? null, $reranked));
                if (!empty($parentIds)) {
                    $parentChunks = $this->chunkRepository->findByIds(array_values(array_unique($parentIds)));
                }
            }
        } catch (Throwable $e) {
            Log::channel('rag')->warning('Retrieval database query failed, proceeding with direct context', [
                'error' => $e->getMessage(),
                'trace_id' => $traceId,
            ]);
            $gateResult = new ConfidenceGateResult(false, 'database_unavailable', [], 0.0);
        }

        $latency = (microtime(true) - $startTime) * 1000;

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