<?php

declare(strict_types=1);

namespace App\DTO;

/**
 * Data Transfer Object representing a document in the RAG system.
 */
readonly class DocumentData
{
    /**
     * @param string $id The unique identifier for the document.
     * @param string $name The display name of the document.
     * @param string $sourceFile The absolute path or URL to the source file.
     * @param string $contentHash Hash of the file contents for deduplication.
     * @param DocumentStatus $status Current processing status.
     * @param array<string, mixed> $metadata Additional metadata.
     */
    public function __construct(
        public string $id,
        public string $name,
        public string $sourceFile,
        public string $contentHash,
        public DocumentStatus $status,
        public array $metadata = []
    ) {}
}
