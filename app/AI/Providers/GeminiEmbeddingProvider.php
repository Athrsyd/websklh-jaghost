<?php

declare(strict_types=1);

namespace App\AI\Providers;

use App\AI\Contracts\EmbeddingProviderInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;
use Throwable;

/**
 * Gemini Embedding provider using Google's text-embedding-004 API.
 * Pure PHP — no Python dependency.
 */
readonly class GeminiEmbeddingProvider implements EmbeddingProviderInterface
{
    private string $apiKey;
    private string $modelName;
    private int $outputDimensions;

    public function __construct()
    {
        $this->apiKey = config('rag.llm.providers.gemini.api_key', env('GEMINI_API_KEY', ''));
        $this->modelName = 'gemini-embedding-001';
        $this->outputDimensions = (int) config('rag.embedding.dimensions', 384);
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
        // Gemini batch limit is 100
        $batches = array_chunk($texts, 100);

        foreach ($batches as $batch) {
            try {
                $requests = [];
                foreach ($batch as $text) {
                    $requests[] = [
                        'model' => "models/{$this->modelName}",
                        'content' => [
                            'parts' => [['text' => $text]],
                        ],
                        'outputDimensionality' => $this->outputDimensions,
                    ];
                }

                $url = "https://generativelanguage.googleapis.com/v1beta/models/{$this->modelName}:batchEmbedContents?key={$this->apiKey}";

                $response = Http::timeout(120)
                    ->retry(3, 2000)
                    ->post($url, [
                        'requests' => $requests,
                    ]);

                if (!$response->successful()) {
                    $body = $response->body();
                    throw new RuntimeException("Gemini Embedding API error [{$response->status()}]: {$body}");
                }

                $data = $response->json();

                if (isset($data['error'])) {
                    throw new RuntimeException("Gemini API error: " . json_encode($data['error']));
                }

                $embeddings = $data['embeddings'] ?? [];
                foreach ($embeddings as $emb) {
                    $allEmbeddings[] = $emb['values'] ?? [];
                }
            } catch (Throwable $e) {
                Log::channel('rag')->error('GeminiEmbeddingProvider error', [
                    'error' => $e->getMessage(),
                ]);
                throw new RuntimeException('Failed to generate embeddings: ' . $e->getMessage(), 0, $e);
            }
        }

        return $allEmbeddings;
    }

    public function dimensions(): int
    {
        return $this->outputDimensions;
    }

    public function model(): string
    {
        return $this->modelName;
    }

    public function version(): string
    {
        return '2.0-gemini-api';
    }
}
