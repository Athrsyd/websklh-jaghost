<?php

declare(strict_types=1);

namespace App\AI\Providers;

use App\AI\Contracts\RerankerProviderInterface;
use App\AI\Contracts\EmbeddingProviderInterface;
use App\DTO\RerankedDocument;
use Illuminate\Support\Facades\Log;
use RuntimeException;
use Throwable;

/**
 * Pure PHP reranker using cosine similarity of embeddings.
 * No Python, no external ML model needed.
 */
readonly class PhpCosineRerankerProvider implements RerankerProviderInterface
{
    public function __construct(
        private EmbeddingProviderInterface $embeddingProvider
    ) {}

    public function model(): string
    {
        return 'php-cosine-reranker';
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

        try {
            // Embed query + all documents in one batch
            $allTexts = array_merge([$query], $documents);
            $embeddings = $this->embeddingProvider->embedBatch($allTexts);

            $queryEmb = $embeddings[0];
            $results = [];

            for ($i = 0; $i < count($documents); $i++) {
                $docEmb = $embeddings[$i + 1];
                $score = $this->cosineSimilarity($queryEmb, $docEmb);
                $results[] = new RerankedDocument(
                    index: $i,
                    text: $documents[$i],
                    score: $score
                );
            }

            usort($results, fn(RerankedDocument $a, RerankedDocument $b) => $b->score <=> $a->score);

            return $results;
        } catch (Throwable $e) {
            Log::channel('rag')->error('PhpCosineRerankerProvider error', [
                'error' => $e->getMessage(),
            ]);
            throw new RuntimeException('Failed to rerank documents: ' . $e->getMessage(), 0, $e);
        }
    }

    /**
     * @param array<float> $a
     * @param array<float> $b
     * @return float
     */
    private function cosineSimilarity(array $a, array $b): float
    {
        $dotProduct = 0.0;
        $normA = 0.0;
        $normB = 0.0;

        for ($i = 0, $len = count($a); $i < $len; $i++) {
            $dotProduct += $a[$i] * $b[$i];
            $normA += $a[$i] * $a[$i];
            $normB += $b[$i] * $b[$i];
        }

        $denominator = sqrt($normA) * sqrt($normB);

        if ($denominator == 0.0) {
            return 0.0;
        }

        return $dotProduct / $denominator;
    }
}
