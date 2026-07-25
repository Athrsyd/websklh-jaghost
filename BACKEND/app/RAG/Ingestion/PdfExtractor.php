<?php

declare(strict_types=1);

namespace App\RAG\Ingestion;

use App\AI\Contracts\PdfParserInterface;
use App\DTO\ParsedDocument;
use Illuminate\Support\Facades\Log;
use RuntimeException;
use Throwable;

/**
 * Class PdfExtractor
 * 
 * Extracts text and structure from a PDF file.
 */
readonly class PdfExtractor
{
    /**
     * @param PdfParserInterface $parser The PDF parser implementation
     */
    public function __construct(private PdfParserInterface $parser)
    {
    }

    /**
     * Extracts a document using the configured parser.
     *
     * @param string $filePath The path to the PDF file
     * @return ParsedDocument
     * @throws RuntimeException If the file cannot be read or parsed
     */
    public function extract(string $filePath): ParsedDocument
    {
        if (!file_exists($filePath) || !is_readable($filePath)) {
            throw new RuntimeException("File does not exist or is not readable: {$filePath}");
        }

        $startTime = microtime(true);

        try {
            $parsedDocument = $this->parser->parse($filePath);
        } catch (Throwable $e) {
            Log::channel('rag')->error('PDF parsing failed', [
                'file_path' => $filePath,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw new RuntimeException("Failed to parse PDF: {$e->getMessage()}", 0, $e);
        }

        $duration = microtime(true) - $startTime;

        Log::channel('rag')->info('PDF extracted successfully', [
            'file_path' => $filePath,
            'pages_extracted' => $parsedDocument->totalPages,
            'method' => get_class($this->parser),
            'duration_ms' => round($duration * 1000, 2)
        ]);

        return $parsedDocument;
    }
}
