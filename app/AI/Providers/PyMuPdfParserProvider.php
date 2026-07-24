<?php

declare(strict_types=1);

namespace App\AI\Providers;

use App\AI\Contracts\PdfParserInterface;
use App\DTO\ParsedDocument;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use RuntimeException;
use Throwable;

/**
 * PyMuPDF parser calling a Python script.
 */
readonly class PyMuPdfParserProvider implements PdfParserInterface
{
    private string $scriptPath;

    public function __construct()
    {
        $this->scriptPath = base_path('scripts/pdf_parser.py');
    }

    /**
     * @param string $filePath
     * @return ParsedDocument
     */
    public function parse(string $filePath): ParsedDocument
    {
        if (!file_exists($filePath)) {
            throw new RuntimeException("File not found: {$filePath}");
        }

        try {
            $process = new Process(['python', $this->scriptPath, $filePath]);
            $process->setTimeout(120);
            $process->run();

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }

            $output = $process->getOutput();
            $data = json_decode($output, true, 512, JSON_THROW_ON_ERROR);

            if (isset($data['error'])) {
                throw new RuntimeException($data['error']);
            }

            return new ParsedDocument(
                title: $data['title'] ?? '',
                totalPages: $data['total_pages'] ?? 0,
                extractionMethod: $data['extraction_method'] ?? 'pymupdf',
                extractionConfidence: (float)($data['extraction_confidence'] ?? 1.0),
                pages: $data['pages'] ?? [],
                metadata: $data['metadata'] ?? []
            );
        } catch (Throwable $e) {
            Log::channel('rag')->error('PyMuPdfParserProvider error', [
                'error' => $e->getMessage(),
                'file' => $filePath,
            ]);
            throw new RuntimeException('Failed to parse PDF: ' . $e->getMessage(), 0, $e);
        }
    }

    /**
     * @param string $filePath
     * @return bool
     */
    public function supports(string $filePath): bool
    {
        $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        return $ext === 'pdf';
    }
}
