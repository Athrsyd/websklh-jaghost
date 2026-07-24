<?php

declare(strict_types=1);

namespace App\RAG\Retrieval;

use App\AI\Contracts\EmbeddingProviderInterface;
use App\Repositories\EmbeddingRepository;
use App\DTO\RetrievalResult;

class DenseVectorSearcher
{
    public function __construct(
        private readonly EmbeddingRepository $repository,
        private readonly EmbeddingProviderInterface $embeddingProvider
    ) {}

    /**
     * @param string $query
     * @param string $documentVersionId
     * @param int $limit
     * @return array<int, RetrievalResult>
     */
    public function search(string $query, string $documentVersionId, int $limit = 50): array
    {
        $embedding = $this->embeddingProvider->embed($query);
        return $this->repository->denseSimilaritySearch($embedding, $documentVersionId, $limit);
    }
}