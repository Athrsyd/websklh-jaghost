<?php

declare(strict_types=1);

namespace App\RAG\Generation;

use Illuminate\Support\Facades\Log;

class PromptInjectionDefense
{
    private array $patterns = [
        // English injection patterns
        '/ignore (all )?previous instructions/i',
        '/ignore all previous/i',
        '/system\s*:/i',
        '/you are now/i',
        '/forget everything/i',
        '/disregard (all )?(instructions|rules)/i',
        '/jailbreak/i',
        '/DAN mode/i',
        '/developer mode/i',
        '/reveal (your )?(prompt|system instructions)/i',
        
        // Indonesian injection patterns
        '/abaikan (semua )?(instruksi|perintah|aturan)( sebelumnya)?/i',
        '/lupakan (semua )?(instruksi|perintah|aturan)/i',
        '/kamu sekarang adalah/i',
        '/bocorkan (system prompt|prompt sistem|instruksi rahasia)/i',
        '/tampilkan (system prompt|prompt sistem)/i',
        '/jangan ikuti aturan/i',
    ];

    public function sanitize(string $input): string
    {
        // 1. Length guard: truncate excessively long user input (max 600 chars)
        $clean = mb_substr($input, 0, 600);

        // 2. Strip adversarial injection patterns
        foreach ($this->patterns as $pattern) {
            if (preg_match($pattern, $clean)) {
                Log::channel('rag')->warning('Prompt injection attempt detected and sanitized.', [
                    'pattern' => $pattern,
                    'input' => $input,
                ]);
                $clean = preg_replace($pattern, '', $clean);
            }
        }

        // 3. Remove control characters
        $clean = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $clean);

        return trim((string) $clean);
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