<?php

declare(strict_types=1);

namespace App\AI\Providers;

use App\AI\Contracts\EmbeddingProviderInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;
use Throwable;

/**
 * HuggingFace Inference API embedding provider (pure PHP, no Python).
 */
readonly class HuggingFaceEmbeddingProvider implements EmbeddingProviderInterface
{
    private string $apiUrl;
    private string $apiKey;

    public function __construct()
    {
        $model = config('rag.embedding.model', 'paraphrase-multilingual-MiniLM-L12-v2');
        $this->apiUrl = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/{$model}";
        $this->apiKey = config('rag.embedding.huggingface_api_key', env('HUGGINGFACE_API_KEY', ''));
    }

    public function embed(string $text): array
    {
        $results = $this->embedBatch([$text]);
        return $results[0] ?? [];
    }

    /**
     * @param array<string> $texts
     * @return array<int, array<float>>
     */
    public function embedBatch(array $texts): array
    {
        if (empty($texts)) {
            return [];
        }

        $allEmbeddings = [];
        $batches = array_chunk($texts, 32);

        foreach ($batches as $batch) {
            try {
                $response = Http::withHeaders([
                    'Authorization' => "Bearer {$this->apiKey}",
                ])->timeout(120)->post($this->apiUrl, [
                    'inputs' => array_values($batch),
                    'options' => ['wait_for_model' => true],
                ]);

                if (!$response->successful()) {
                    $body = $response->body();
                    throw new RuntimeException("HuggingFace API error [{$response->status()}]: {$body}");
                }

                $data = $response->json();

                if (isset($data['error'])) {
                    throw new RuntimeException("HuggingFace API error: {$data['error']}");
                }

                // The API returns array of embeddings for batch input
                foreach ($data as $embedding) {
                    // Handle nested array (sentence-transformers returns [[...]]) 
                    if (is_array($embedding) && !empty($embedding) && is_array($embedding[0] ?? null)) {
                        // Mean pooling: average token embeddings
                        $dims = count($embedding[0]);
                        $pooled = array_fill(0, $dims, 0.0);
                        foreach ($embedding as $tokenEmb) {
                            for ($i = 0; $i < $dims; $i++) {
                                $pooled[$i] += $tokenEmb[$i];
                            }
                        }
                        $count = count($embedding);
                        for ($i = 0; $i < $dims; $i++) {
                            $pooled[$i] /= $count;
                        }
                        $allEmbeddings[] = $pooled;
                    } else {
                        $allEmbeddings[] = $embedding;
                    }
                }
            } catch (Throwable $e) {
                Log::channel('rag')->error('HuggingFaceEmbeddingProvider error', [
                    'error' => $e->getMessage(),
                ]);
                throw new RuntimeException('Failed to generate embeddings: ' . $e->getMessage(), 0, $e);
            }
        }

        return $allEmbeddings;
    }

    public function dimensions(): int
    {
        return 384;
    }

    public function model(): string
    {
        return config('rag.embedding.model', 'paraphrase-multilingual-MiniLM-L12-v2');
    }

    public function version(): string
    {
        return '2.0-api';
    }
}
