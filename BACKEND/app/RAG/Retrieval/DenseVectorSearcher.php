<?php

declare(strict_types=1);

namespace App\RAG\Retrieval;

use App\AI\Contracts\EmbeddingProviderInterface;
use App\Repositories\EmbeddingRepository;
use App\DTO\RetrievalResult;
use Illuminate\Support\Facades\Cache;

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
        $normalizedQuery = mb_strtolower(trim($query));
        $cacheKey = 'rag_query_emb_' . hash('sha256', $normalizedQuery . '_' . $this->embeddingProvider->dimensions());

        // Cache query embedding for 1 hour to reduce API latency and external API calls
        $embedding = Cache::remember($cacheKey, 3600, function () use ($normalizedQuery) {
            return $this->embeddingProvider->embed($normalizedQuery);
        });

        return $this->repository->denseSimilaritySearch($embedding, $documentVersionId, $limit);
    }
}