<?php

declare(strict_types=1);

namespace App\DTO;

/**
 * Data Transfer Object representing a document that has been reranked.
 */
readonly class RerankedDocument
{
    /**
     * @param int $index The original index of the document before reranking.
     * @param string $text The text content of the document.
     * @param float $score The relevance score assigned by the reranker.
     */
    public function __construct(
        public int $index,
        public string $text,
        public float $score
    ) {}
}
