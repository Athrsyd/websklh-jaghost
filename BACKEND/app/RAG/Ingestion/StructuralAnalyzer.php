<?php

declare(strict_types=1);

namespace App\RAG\Ingestion;

use App\DTO\ParsedDocument;
use Illuminate\Support\Str;

/**
 * Class StructuralAnalyzer
 * 
 * Analyzes parsed document to identify structure.
 */
readonly class StructuralAnalyzer
{
    public function analyze(ParsedDocument $document): DocumentStructure
    {
        $sections = [];
        $headingHierarchy = [];
        $currentHeading = $document->title ?: 'Dokumen';
        $currentBreadcrumb = $currentHeading;
        
        $currentElements = [];
        $currentText = '';
        $pageStart = 1;
        $pageEnd = 1;

        foreach ($document->pages as $page) {
            $pageNum = $page['page_number'] ?? $page['pageNumber'] ?? 1;
            $elements = $page['elements'] ?? [];
            $pageText = $page['text'] ?? '';

            if (empty($elements)) {
                $elements = [['type' => 'paragraph', 'text' => $pageText]];
            }

            foreach ($elements as $elem) {
                $type = $elem['type'] ?? 'paragraph';
                $text = trim($elem['text'] ?? '');

                if (empty($text)) {
                    continue;
                }

                if ($type === 'heading') {
                    if (!empty($currentText)) {
                        $sections[] = [
                            'heading' => $currentHeading,
                            'level' => 1,
                            'breadcrumb' => $currentBreadcrumb,
                            'elements' => $currentElements,
                            'text' => trim($currentText),
                            'pageStart' => $pageStart,
                            'pageEnd' => $pageEnd,
                        ];
                    }

                    $currentHeading = $text;
                    $currentBreadcrumb = ($document->title ? $document->title . ' > ' : '') . $text;
                    $currentElements = [$elem];
                    $currentText = $text . "\n";
                    $pageStart = $pageNum;
                    $pageEnd = $pageNum;
                    $headingHierarchy[] = ['heading' => $text, 'level' => 1, 'page' => $pageNum];
                } else {
                    $currentElements[] = $elem;
                    $currentText .= $text . "\n";
                    $pageEnd = $pageNum;
                }
            }
        }

        if (!empty(trim($currentText))) {
            $sections[] = [
                'heading' => $currentHeading,
                'level' => 1,
                'breadcrumb' => $currentBreadcrumb,
                'elements' => $currentElements,
                'text' => trim($currentText),
                'pageStart' => $pageStart,
                'pageEnd' => $pageEnd,
            ];
        }

        return new DocumentStructure(
            $document->title ?: 'Dokumen',
            $sections,
            [],
            [],
            $document->totalPages,
            $headingHierarchy
        );
    }
}
