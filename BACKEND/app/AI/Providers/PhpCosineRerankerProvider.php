<?php

declare(strict_types=1);

namespace App\AI\Providers;

use App\AI\Contracts\RerankerProviderInterface;
use App\DTO\RerankedDocument;
use Illuminate\Support\Facades\Log;

/**
 * Ultra-fast pure PHP text overlap & relevance reranker.
 * Zero external API calls, 100% token efficient, <1ms latency.
 */
readonly class PhpCosineRerankerProvider implements RerankerProviderInterface
{
    public function model(): string
    {
        return 'php-lexical-reranker';
    }

    /**
     * @param string $query
     * @param array<string> $documents
     * @return array<RerankedDocument>
     */
    public function rerank(string $query, array $documents): array
    {
        if (empty($documents)) {
            return [];
        }

        // Tokenize query words
        $queryWords = array_unique(array_filter(explode(' ', mb_strtolower(trim($query)))));
        $results = [];

        foreach ($documents as $i => $docText) {
            $docLower = mb_strtolower($docText);
            $matches = 0;
            
            foreach ($queryWords as $word) {
                if (mb_strlen($word) > 2 && mb_strpos($docLower, $word) !== false) {
                    $matches++;
                }
            }

            // Score based on word match ratio + position bias
            $wordCount = max(count($queryWords), 1);
            $score = ($matches / $wordCount) + (1 / ($i + 1)) * 0.1;

            $results[] = new RerankedDocument(
                index: $i,
                text: $docText,
                score: (float)$score
            );
        }

        usort($results, fn(RerankedDocument $a, RerankedDocument $b) => $b->score <=> $a->score);

        return $results;
    }
}
