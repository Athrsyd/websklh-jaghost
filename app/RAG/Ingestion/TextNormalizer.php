<?php

declare(strict_types=1);

namespace App\RAG\Ingestion;

use Normalizer;

/**
 * Class TextNormalizer
 * 
 * Normalizes text extracted from documents.
 */
class TextNormalizer
{
    /**
     * Normalizes text for standard processing.
     *
     * @param string $text The raw text
     * @return string Normalized text
     */
    public function normalize(string $text): string
    {
        // Normalize Unicode (NFC normalization)
        $text = Normalizer::normalize($text, Normalizer::FORM_C) ?: $text;
        
        // Remove null bytes
        $text = str_replace("\0", '', $text);
        
        // Normalize line endings to \n
        $text = preg_replace('/\r\n|\r/', "\n", $text);
        
        // Replace multiple whitespace with a single space (excluding newlines)
        $text = preg_replace('/[^\S\n]+/', ' ', $text);
        
        // Trim lines
        $lines = explode("\n", $text);
        $lines = array_map('trim', $lines);
        
        return trim(implode("\n", $lines));
    }

    /**
     * Normalizes text for search indexing/matching.
     *
     * @param string $text The raw text
     * @return string Normalized text for search
     */
    public function normalizeForSearch(string $text): string
    {
        $text = $this->normalize($text);
        $text = mb_strtolower($text, 'UTF-8');
        
        // Remove diacritics
        $transliterator = \Transliterator::createFromRules(
            ':: Any-Latin; :: Latin-ASCII; :: NFD; :: [:Nonspacing Mark:] Remove; :: Lower(); :: NFC;',
            \Transliterator::FORWARD
        );
        
        return $transliterator ? $transliterator->transliterate($text) ?: $text : $text;
    }
}
