<?php

declare(strict_types=1);

namespace App\AI\Contracts;

use App\DTO\RerankedDocument;

/**
 * Interface for document re-ranking models/services.
 */
interface RerankerProviderInterface
{
    /**
     * Re-rank a set of documents based on relevance to a query.
     *
     * @param string $query The search query.
     * @param array<int, string> $documents The list of documents to rerank.
     * @return array<int, RerankedDocument> The reranked documents, ordered by score descending.
     */
    public function rerank(string $query, array $documents): array;

    /**
     * Get the name of the reranking model being used.
     *
     * @return string The model name.
     */
    public function model(): string;
}
