<?php

declare(strict_types=1);

namespace App\AI\Providers;

use App\AI\Contracts\LlmProviderInterface;
use App\DTO\LlmResponse;
use Illuminate\Support\Facades\Log;
use Generator;
use Throwable;

/**
 * High-Availability Resilient LLM Provider with automatic failover.
 * Tries the primary provider (Groq), if rate limited (429) or failing,
 * automatically falls back to secondary provider (Gemini).
 */
class FallbackLlmProvider implements LlmProviderInterface
{
    public function __construct(
        private readonly GroqLlmProvider $groqProvider,
        private readonly GeminiLlmProvider $geminiProvider
    ) {}

    public function model(): string
    {
        return 'resilient-hybrid(' . $this->groqProvider->model() . '|' . $this->geminiProvider->model() . ')';
    }

    public function chat(array $messages, float $temperature = 0.1, int $maxTokens = 2048, ?array $tools = null): LlmResponse
    {
        $configuredPrimary = config('rag.llm.provider', 'groq');
        
        $first = $configuredPrimary === 'gemini' ? $this->geminiProvider : $this->groqProvider;
        $second = $configuredPrimary === 'gemini' ? $this->groqProvider : $this->geminiProvider;
        $firstName = $configuredPrimary === 'gemini' ? 'Gemini' : 'Groq';
        $secondName = $configuredPrimary === 'gemini' ? 'Groq' : 'Gemini';

        // 1. Try Primary Provider
        try {
            return $first->chat($messages, $temperature, $maxTokens, $tools);
        } catch (Throwable $e) {
            Log::channel('rag')->warning("Primary LLM ({$firstName}) failed, failing over to secondary ({$secondName})...", [
                'error' => $e->getMessage(),
            ]);
        }

        // 2. Try Secondary Provider (Failover)
        try {
            return $second->chat($messages, $temperature, $maxTokens, $tools);
        } catch (Throwable $e2) {
            Log::channel('rag')->error("Secondary LLM ({$secondName}) also failed.", [
                'error' => $e2->getMessage(),
            ]);
        }

        // 3. Graceful fallback response if all external APIs are unreachable
        return new LlmResponse(
            content: "Maaf, server AI sedang mengalami antrean trafik yang padat. Silakan ulangi pertanyaan Anda beberapa saat lagi.",
            model: 'failover-circuit-breaker',
            promptTokens: 0,
            completionTokens: 0,
            finishReason: 'stop',
            toolCalls: null,
            metadata: ['status' => 'all_providers_degraded']
        );
    }

    public function chatStream(array $messages, float $temperature = 0.1, int $maxTokens = 2048): Generator
    {
        $response = $this->chat($messages, $temperature, $maxTokens);
        yield $response->content;
    }
}
