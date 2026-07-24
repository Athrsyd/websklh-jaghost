<?php

declare(strict_types=1);

namespace App\AI\Contracts;

use App\DTO\ParsedDocument;

/**
 * Interface for parsing content from PDF documents.
 */
interface PdfParserInterface
{
    /**
     * Parse a PDF file into structured content.
     *
     * @param string $filePath The absolute path to the PDF file.
     * @return ParsedDocument The extracted document content.
     * @throws \RuntimeException If the file cannot be parsed.
     */
    public function parse(string $filePath): ParsedDocument;

    /**
     * Check if the parser supports the given file format.
     *
     * @param string $filePath The absolute path to the file.
     * @return bool True if the file is supported, false otherwise.
     */
    public function supports(string $filePath): bool;
}
