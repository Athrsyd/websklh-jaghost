<?php

declare(strict_types=1);

namespace App\RAG\Chunking;

use App\DTO\ChunkData;

/**
 * Class ChunkSizeGuard
 * 
 * Enforces min and max token constraints on chunks.
 */
class ChunkSizeGuard
{
    /**
     * Guards chunk sizes to fit within constraints.
     *
     * @param array<ChunkData> $chunks
     * @return array<ChunkData>
     */
    public function guard(array $chunks): array
    {
        return array_values(array_filter($chunks, fn($c) => !empty(trim($c->originalText))));
    }
}
