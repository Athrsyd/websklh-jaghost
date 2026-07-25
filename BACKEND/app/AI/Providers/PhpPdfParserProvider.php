<?php

declare(strict_types=1);

namespace App\AI\Providers;

use App\AI\Contracts\PdfParserInterface;
use App\DTO\ParsedDocument;
use Illuminate\Support\Facades\Log;
use Smalot\PdfParser\Parser;
use RuntimeException;
use Throwable;

/**
 * Pure PHP PDF parser using smalot/pdfparser.
 */
readonly class PhpPdfParserProvider implements PdfParserInterface
{
    public function parse(string $filePath): ParsedDocument
    {
        if (!file_exists($filePath)) {
            throw new RuntimeException("File not found: {$filePath}");
        }

        try {
            $parser = new Parser();
            $pdf = $parser->parseFile($filePath);
            $details = $pdf->getDetails();
            $pdfPages = $pdf->getPages();

            $pages = [];
            $pageNumber = 0;

            foreach ($pdfPages as $page) {
                $pageNumber++;
                $text = $page->getText();

                if (empty(trim($text))) {
                    continue;
                }

                $pages[] = [
                    'pageNumber' => $pageNumber,
                    'text' => $text,
                    'elements' => [],
                ];
            }

            return new ParsedDocument(
                title: $details['Title'] ?? pathinfo($filePath, PATHINFO_FILENAME),
                pages: $pages,
                totalPages: count($pdfPages),
                extractionMethod: 'smalot-pdfparser',
                extractionConfidence: 0.95,
                metadata: [
                    'author' => $details['Author'] ?? '',
                    'creator' => $details['Creator'] ?? '',
                    'producer' => $details['Producer'] ?? '',
                ]
            );
        } catch (Throwable $e) {
            Log::channel('rag')->error('PhpPdfParserProvider error', [
                'error' => $e->getMessage(),
                'file' => $filePath,
            ]);
            throw new RuntimeException('Failed to parse PDF: ' . $e->getMessage(), 0, $e);
        }
    }

    public function supports(string $filePath): bool
    {
        return strtolower(pathinfo($filePath, PATHINFO_EXTENSION)) === 'pdf';
    }
}
