<?php

declare(strict_types=1);

namespace App\DTO;

/**
 * Data Transfer Object representing a vector embedding.
 */
readonly class EmbeddingData
{
    /**
     * @param string $id Unique identifier for the embedding.
     * @param string $chunkId ID of the chunk this embedding represents.
     * @param array<int, float> $embedding The vector embedding array.
     * @param string $model The model used to generate the embedding.
     * @param string $modelVersion The version of the embedding model.
     * @param int $dimensions The dimensionality of the vector.
     */
    public function __construct(
        public string $id,
        public string $chunkId,
        public array $embedding,
        public string $model,
        public string $modelVersion,
        public int $dimensions
    ) {}
}
