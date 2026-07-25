<?php

declare(strict_types=1);

namespace App\RAG\Retrieval;

use App\Repositories\EmbeddingRepository;
use App\DTO\RetrievalResult;

class SparseTextSearcher
{
    public function __construct(
        private readonly EmbeddingRepository $repository
    ) {}

    /**
     * @param string $query
     * @param string $documentVersionId
     * @param int $limit
     * @return array<int, RetrievalResult>
     */
    public function search(string $query, string $documentVersionId, int $limit = 50): array
    {
        return $this->repository->sparseSearch($query, $documentVersionId, $limit);
    }
}