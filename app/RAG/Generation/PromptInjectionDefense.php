<?php
declare(strict_types=1);

namespace App\RAG\Generation;

use Illuminate\Support\Facades\Log;

class PromptInjectionDefense
{
    private array $patterns = [
        '/ignore previous instructions/i',
        '/ignore all previous/i',
        '/system:/i',
        '/you are now/i',
        '/forget everything/i',
        '/disregard/i'
    ];

    public function sanitize(string $input): string
    {
        $sanitized = $input;
        foreach ($this->patterns as $pattern) {
            if (preg_match($pattern, $input)) {
                Log::warning('Prompt injection attempt detected and sanitized.', ['pattern' => $pattern, 'input' => $input]);
                $sanitized = preg_replace($pattern, '', $sanitized);
            }
        }
        return trim((string) $sanitized);
    }

    public function sanitizeChunks(array $chunks): array
    {
        foreach ($chunks as $chunk) {
            if (isset($chunk->text)) {
                $chunk->text = $this->sanitize($chunk->text);
            } elseif (is_array($chunk) && isset($chunk['text'])) {
                $chunk['text'] = $this->sanitize($chunk['text']);
            }
        }
        return $chunks;
    }
}