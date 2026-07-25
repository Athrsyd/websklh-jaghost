<?php

declare(strict_types=1);

namespace App\DTO;

/**
 * Data Transfer Object representing the raw response from an LLM.
 */
readonly class LlmResponse
{
    /**
     * @param string $content The text content of the response.
     * @param string $model The model used to generate the response.
     * @param int $promptTokens Number of tokens used in the prompt.
     * @param int $completionTokens Number of tokens in the output.
     * @param string $finishReason The reason the model stopped generating (e.g., 'stop', 'length', 'tool_calls').
     * @param array<int, array<string, mixed>>|null $toolCalls Array of tool calls returned by the model.
     * @param array<string, mixed> $metadata Any additional metadata provided by the API.
     */
    public function __construct(
        public string $content,
        public string $model,
        public int $promptTokens,
        public int $completionTokens,
        public string $finishReason,
        public ?array $toolCalls = null,
        public array $metadata = []
    ) {}
}
