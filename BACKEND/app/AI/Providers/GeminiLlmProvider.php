<?php

declare(strict_types=1);

namespace App\AI\Providers;

use App\AI\Contracts\LlmProviderInterface;
use App\DTO\LlmResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Generator;
use RuntimeException;
use Throwable;

/**
 * Provides LLM integration using Gemini API with Function Calling support.
 */
readonly class GeminiLlmProvider implements LlmProviderInterface
{
    private string $apiKey;
    private string $model;
    private string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('rag.llm.providers.gemini.api_key', '');
        $this->model = config('rag.llm.providers.gemini.model', 'gemini-3.5-flash-lite');
        $this->baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
    }

    public function model(): string
    {
        return $this->model;
    }

    public function chat(array $messages, float $temperature = 0.1, int $maxTokens = 2048, ?array $tools = null): LlmResponse
    {
        $url = "{$this->baseUrl}/{$this->model}:generateContent?key={$this->apiKey}";
        
        try {
            $payload = $this->buildPayload($messages, $temperature, $maxTokens, $tools);
            
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->connectTimeout(15)->timeout(60)->retry(3, 1000)->post($url, $payload);

            if ($response->failed()) {
                Log::channel('rag')->error('Gemini API Error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                throw new RuntimeException("Gemini API error: {$response->status()} - {$response->body()}");
            }

            $data = $response->json();
            $candidate = $data['candidates'][0] ?? [];
            $parts = $candidate['content']['parts'] ?? [];

            $content = '';
            $toolCalls = null;

            foreach ($parts as $part) {
                if (isset($part['text'])) {
                    $content .= $part['text'];
                }

                if (isset($part['functionCall'])) {
                    $fnCall = $part['functionCall'];
                    $fnName = $fnCall['name'] ?? '';
                    $fnArgs = $fnCall['args'] ?? [];

                    $toolCalls[] = [
                        'id' => 'call_' . uniqid(),
                        'type' => 'function',
                        'function' => [
                            'name' => $fnName,
                            'arguments' => json_encode($fnArgs),
                        ],
                    ];
                }
            }

            $promptTokens = $data['usageMetadata']['promptTokenCount'] ?? 0;
            $completionTokens = $data['usageMetadata']['candidatesTokenCount'] ?? 0;
            $finishReason = !empty($toolCalls) ? 'tool_calls' : ($candidate['finishReason'] ?? 'STOP');

            return new LlmResponse(
                content: trim($content),
                model: $this->model,
                promptTokens: $promptTokens,
                completionTokens: $completionTokens,
                finishReason: strtolower($finishReason),
                toolCalls: $toolCalls,
                metadata: $data
            );
        } catch (Throwable $e) {
            Log::channel('rag')->error('Exception in GeminiLlmProvider chat', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw new RuntimeException('Failed to communicate with Gemini LLM: ' . $e->getMessage(), 0, $e);
        }
    }

    public function chatStream(array $messages, float $temperature = 0.1, int $maxTokens = 2048): Generator
    {
        $response = $this->chat($messages, $temperature, $maxTokens);
        yield $response->content;
    }

    private function buildPayload(array $messages, float $temperature, int $maxTokens, ?array $tools = null): array
    {
        $systemInstructions = [];
        $contents = [];

        foreach ($messages as $message) {
            $role = $message['role'];
            $content = $message['content'];

            if ($role === 'system') {
                $systemInstructions[] = ['text' => $content];
            } else {
                $geminiRole = $role === 'assistant' ? 'model' : 'user';
                $contents[] = [
                    'role' => $geminiRole,
                    'parts' => [['text' => $content]],
                ];
            }
        }

        $payload = [
            'contents' => $contents,
            'generationConfig' => [
                'temperature' => $temperature,
                'maxOutputTokens' => $maxTokens,
            ],
        ];

        if (!empty($systemInstructions)) {
            $payload['systemInstruction'] = [
                'parts' => $systemInstructions,
            ];
        }

        // Format OpenAI tools to Gemini functionDeclarations format
        if (!empty($tools)) {
            $functionDeclarations = [];
            foreach ($tools as $tool) {
                if (($tool['type'] ?? '') === 'function' && isset($tool['function'])) {
                    $fn = $tool['function'];
                    $functionDeclarations[] = [
                        'name' => $fn['name'],
                        'description' => $fn['description'] ?? '',
                        'parameters' => $fn['parameters'] ?? [],
                    ];
                }
            }

            if (!empty($functionDeclarations)) {
                $payload['tools'] = [
                    ['functionDeclarations' => $functionDeclarations]
                ];
            }
        }

        return $payload;
    }
}
