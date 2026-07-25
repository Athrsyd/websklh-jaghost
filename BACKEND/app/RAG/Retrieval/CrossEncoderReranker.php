<?php

declare(strict_types=1);

namespace App\RAG\Retrieval;

use App\AI\Contracts\RerankerProviderInterface;
use App\DTO\RetrievalResult;
use App\DTO\RerankedDocument;

class CrossEncoderReranker
{
    public function __construct(
        private readonly RerankerProviderInterface $reranker
    ) {}

    /**
     * @param string $query
     * @param array<RetrievalResult> $results
     * @param int $topN
     * @return array<RetrievalResult>
     */
    public function rerank(string $query, array $results, int $topN = 5): array
    {
        if (empty($results)) {
            return [];
        }

        $texts = array_map(fn(RetrievalResult $r) => $r->text, $results);
        $rerankedDocs = $this->reranker->rerank($query, $texts);

        $rerankedResults = [];
        foreach ($rerankedDocs as $rerankedDoc) {
            $idx = $rerankedDoc->index;
            if (isset($results[$idx])) {
                $item = $results[$idx];
                $item->rerankerScore = $rerankedDoc->score;
                $rerankedResults[] = $item;
            }
        }

        if (empty($rerankedResults)) {
            return array_slice($results, 0, $topN);
        }

        usort($rerankedResults, fn(RetrievalResult $a, RetrievalResult $b) => ($b->rerankerScore ?? 0.0) <=> ($a->rerankerScore ?? 0.0));

        return array_slice($rerankedResults, 0, $topN);
    }
}