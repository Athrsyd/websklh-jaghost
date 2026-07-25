<?php

declare(strict_types=1);

namespace App\AI\Contracts;

/**
 * Interface for vector embedding providers.
 */
interface EmbeddingProviderInterface
{
    /**
     * Embed a single text string.
     *
     * @param string $text The input text to embed.
     * @return float[] The vector embedding.
     */
    public function embed(string $text): array;

    /**
     * Embed multiple text strings in a batch.
     *
     * @param array<int, string> $texts The input texts to embed.
     * @return array<int, float[]> The vector embeddings.
     */
    public function embedBatch(array $texts): array;

    /**
     * Get the dimensions of the generated embeddings.
     *
     * @return int The embedding dimensionality.
     */
    public function dimensions(): int;

    /**
     * Get the name of the model being used.
     *
     * @return string The model name.
     */
    public function model(): string;

    /**
     * Get the version of the model being used.
     *
     * @return string The model version.
     */
    public function version(): string;
}
