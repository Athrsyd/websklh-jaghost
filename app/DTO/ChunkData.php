<?php

declare(strict_types=1);

namespace App\DTO;

/**
 * Data Transfer Object representing a semantic chunk of a document.
 */
readonly class ChunkData
{
    /**
     * @param string $id Unique identifier for the chunk.
     * @param string $documentVersionId ID linking to the document version.
     * @param string|null $parentChunkId ID of the parent chunk, if this is a child.
     * @param int $chunkIndex Sequential index of the chunk in the document.
     * @param ChunkType $chunkType The semantic type of the chunk content.
     * @param string $originalText The raw text content of the chunk.
     * @param string|null $contextualHeader LLM-generated contextual header.
     * @param string|null $heading The nearest preceding heading.
     * @param string|null $section The document section name.
     * @param string|null $breadcrumb Hierarchical path (e.g., "H1 > H2 > H3").
     * @param int $pageStart The starting page number of the chunk.
     * @param int $pageEnd The ending page number of the chunk.
     * @param string $language The detected language (e.g., 'en', 'id').
     * @param string $contentHash A hash of the original text to detect duplicates.
     * @param int $tokenCount Number of tokens in the chunk.
     * @param bool $isParent Whether this chunk acts as a parent for hierarchical chunking.
     * @param array<string, mixed> $metadata Any additional metadata.
     */
    public function __construct(
        public string $id,
        public string $documentVersionId,
        public ?string $parentChunkId,
        public int $chunkIndex,
        public ChunkType $chunkType,
        public string $originalText,
        public ?string $contextualHeader,
        public ?string $heading,
        public ?string $section,
        public ?string $breadcrumb,
        public int $pageStart,
        public int $pageEnd,
        public string $language,
        public string $contentHash,
        public int $tokenCount,
        public bool $isParent,
        public array $metadata = []
    ) {}
}
