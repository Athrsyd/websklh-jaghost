<?php

declare(strict_types=1);

namespace App\RAG\Ingestion;

/**
 * Class DocumentStructure
 * 
 * Represents the hierarchical structure of a parsed document.
 */
readonly class DocumentStructure
{
    /**
     * @param string $title
     * @param array $sections
     * @param array $removedHeaders
     * @param array $removedFooters
     * @param int $totalPages
     * @param array $headingHierarchy
     */
    public function __construct(
        public string $title,
        public array $sections,
        public array $removedHeaders,
        public array $removedFooters,
        public int $totalPages,
        public array $headingHierarchy
    ) {
    }
}
