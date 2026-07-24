<?php

declare(strict_types=1);

namespace App\DTO;

/**
 * Class IngestionProgress
 * 
 * Represents the progress of document ingestion.
 */
readonly class IngestionProgress
{
    /**
     * @param string $documentId
     * @param string $documentVersionId
     * @param string $status
     * @param int $totalPages
     * @param int $totalChunks
     * @param int $parentChunks
     * @param int $childChunks
     * @param int $embeddingsGenerated
     * @param float $durationMs
     * @param string|null $error
     * @param array $metadata
     */
    public function __construct(
        public string $documentId,
        public string $documentVersionId,
        public string $status,
        public int $totalPages,
        public int $totalChunks,
        public int $parentChunks,
        public int $childChunks,
        public int $embeddingsGenerated,
        public float $durationMs,
        public ?string $error = null,
        public array $metadata = []
    ) {
    }
}
