<?php

declare(strict_types=1);

namespace App\RAG\Embedding;

use App\AI\Contracts\EmbeddingProviderInterface;
use App\DTO\ChunkData;
use Illuminate\Support\Facades\Log;

/**
 * Class EmbeddingService
 * 
 * Orchestrates embedding generation.
 */
readonly class EmbeddingService
{
    public function __construct(private EmbeddingProviderInterface $provider)
    {
    }

    public function embedChunk(ChunkData $chunk): array
    {
        $textToEmbed = ($chunk->contextualHeader ? $chunk->contextualHeader . "\n" : "") . $chunk->originalText;
        return $this->provider->embed($textToEmbed);
    }

    /**
     * @param array<ChunkData> $chunks
     * @return array<array<float>>
     */
    public function embedChunks(array $chunks): array
    {
        if (empty($chunks)) {
            return [];
        }

        $textsToEmbed = array_map(function (ChunkData $chunk) {
            return ($chunk->contextualHeader ? $chunk->contextualHeader . "\n" : "") . $chunk->originalText;
        }, $chunks);

        $embeddings = $this->provider->embedBatch($textsToEmbed);

        Log::channel('rag')->info('Generated embeddings for batch', [
            'batch_size' => count($chunks)
        ]);

        return $embeddings;
    }

    public function dimensions(): int
    {
        return $this->provider->dimensions();
    }

    public function model(): string
    {
        return $this->provider->model();
    }

    public function version(): string
    {
        return $this->provider->version();
    }
}
