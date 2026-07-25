<?php

declare(strict_types=1);

namespace App\DTO;

/**
 * Data Transfer Object representing the output of the PDF Parser.
 */
readonly class ParsedDocument
{
    /**
     * @param string $title The extracted title of the document.
     * @param array<int, array{pageNumber: int, text: string, elements: array<mixed>}> $pages The pages extracted from the PDF.
     * @param int $totalPages Total number of pages in the document.
     * @param string $extractionMethod The method used for extraction.
     * @param float $extractionConfidence The confidence score of the extraction process.
     * @param array<string, mixed> $metadata Additional metadata from the parser.
     */
    public function __construct(
        public string $title,
        public array $pages,
        public int $totalPages,
        public string $extractionMethod,
        public float $extractionConfidence,
        public array $metadata = []
    ) {}
}
