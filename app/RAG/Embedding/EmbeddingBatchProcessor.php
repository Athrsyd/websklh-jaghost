<?php

declare(strict_types=1);

namespace App\RAG\Embedding;

use Generator;
use Illuminate\Support\Facades\Log;

/**
 * Class EmbeddingBatchProcessor
 * 
 * Processes chunks into embeddings in batches.
 */
readonly class EmbeddingBatchProcessor
{
    /**
     * @param EmbeddingService $embeddingService
     */
    public function __construct(private EmbeddingService $embeddingService)
    {
    }

    /**
     * Processes chunks in batches.
     *
     * @param array $chunks
     * @param int $batchSize
     * @return Generator
     */
    public function process(array $chunks, int $batchSize = 50): Generator
    {
        $totalBatches = ceil(count($chunks) / $batchSize);
        $chunksList = array_values($chunks);

        for ($i = 0; $i < count($chunksList); $i += $batchSize) {
            $batch = array_slice($chunksList, $i, $batchSize);
            $embeddings = $this->embeddingService->embedChunks($batch);

            $currentBatch = floor($i / $batchSize) + 1;
            Log::channel('rag')->info("Embedded batch {$currentBatch}/{$totalBatches}");

            yield from array_map(null, $batch, $embeddings);
            
            // Rate limiting
            usleep(100000);
        }
    }
}
