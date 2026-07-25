<?php

declare(strict_types=1);

namespace App\AI\Contracts;

use App\DTO\LlmResponse;
use Generator;

/**
 * Interface for Large Language Model (LLM) generation providers.
 */
interface LlmProviderInterface
{
    /**
     * Send a chat completion request to the LLM.
     *
     * @param array<int, array{role: string, content: string}> $messages The conversation messages.
     * @param float $temperature The generation temperature.
     * @param int $maxTokens The maximum number of tokens to generate.
     * @param array<int, array<string, mixed>>|null $tools Optional OpenAI tool definitions for function calling.
     * @return LlmResponse The response from the model.
     */
    public function chat(array $messages, float $temperature = 0.1, int $maxTokens = 2048, ?array $tools = null): LlmResponse;

    /**
     * Stream a chat completion request from the LLM.
     *
     * @param array<int, array{role: string, content: string}> $messages The conversation messages.
     * @param float $temperature The generation temperature.
     * @param int $maxTokens The maximum number of tokens to generate.
     * @return Generator<string> A generator yielding chunks of the generated response.
     */
    public function chatStream(array $messages, float $temperature = 0.1, int $maxTokens = 2048): Generator;

    /**
     * Get the name of the model being used.
     *
     * @return string The model name.
     */
    public function model(): string;
}
