<?php

declare(strict_types=1);

namespace App\RAG\Ingestion;

use App\DTO\ParsedDocument;

/**
 * Class StructuralAnalyzer
 * 
 * Analyzes parsed document to identify page-by-page structure and sections.
 */
readonly class StructuralAnalyzer
{
    public function analyze(ParsedDocument $document): DocumentStructure
    {
        $sections = [];
        $headingHierarchy = [];
        $docTitle = $document->title ?: 'Dokumen SMKN 26 Jakarta';

        $pageNum = 0;
        foreach ($document->pages as $page) {
            $pageNum++;
            $pageText = trim($page['text'] ?? '');
            if (empty($pageText)) {
                continue;
            }

            // Detect heading from first non-empty line
            $lines = array_values(array_filter(array_map('trim', explode("\n", $pageText))));
            $firstLine = $lines[0] ?? "Halaman {$pageNum}";
            $heading = mb_strlen($firstLine) < 80 ? $firstLine : "Informasi Halaman {$pageNum}";

            $sections[] = [
                'heading' => $heading,
                'level' => 1,
                'breadcrumb' => "{$docTitle} > {$heading}",
                'elements' => [['type' => 'paragraph', 'text' => $pageText]],
                'text' => $pageText,
                'pageStart' => $pageNum,
                'pageEnd' => $pageNum,
            ];

            $headingHierarchy[] = [
                'heading' => $heading,
                'level' => 1,
                'page' => $pageNum,
            ];
        }

        return new DocumentStructure(
            $docTitle,
            $sections,
            [],
            [],
            $document->totalPages,
            $headingHierarchy
        );
    }
}
