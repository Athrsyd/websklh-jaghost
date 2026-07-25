<?php

declare(strict_types=1);

namespace App\RAG\Generation;

use App\DTO\Citation;
use App\DTO\RetrievalResult;

class CitationFormatter
{
    /**
     * @param string $answer
     * @param array<RetrievalResult> $results
     * @return array<Citation>
     */
    public function extractCitations(string $answer, array $results): array
    {
        $citations = [];
        $index = 1;

        if (preg_match_all('/\[Halaman (\d+)\]/i', $answer, $matches)) {
            $pages = array_unique($matches[1]);
            
            foreach ($pages as $page) {
                foreach ($results as $result) {
                    if ($result instanceof RetrievalResult && $result->page == $page) {
                        $citations[] = new Citation(
                            index: $index++,
                            text: mb_substr($result->text, 0, 150) . '...',
                            page: (int)$page,
                            section: $result->section,
                            chunkId: $result->chunkId
                        );
                        break;
                    }
                }
            }
        }

        if (empty($citations) && !empty($results)) {
            foreach (array_slice($results, 0, 3) as $result) {
                $citations[] = new Citation(
                    index: $index++,
                    text: mb_substr($result->text, 0, 150) . '...',
                    page: $result->page,
                    section: $result->section,
                    chunkId: $result->chunkId
                );
            }
        }

        return $citations;
    }
}