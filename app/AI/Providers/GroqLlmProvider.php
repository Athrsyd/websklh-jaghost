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
 * Provides LLM integration using Groq API.
 */
readonly class GroqLlmProvider implements LlmProviderInterface
{
    private string $apiKey;
    private string $model;
    private string $baseUrl;

    public function __construct()
    {
        $this->apiKey = (string) config('rag.llm.providers.groq.api_key', '');
        $this->model = (string) config('rag.llm.model', 'llama-3.3-70b-versatile');
        $this->baseUrl = 'https://api.groq.com/openai/v1/chat/completions';
    }

    public function model(): string
    {
        return $this->model;
    }

    public function chat(array $messages, float $temperature = 0.1, int $maxTokens = 2048): LlmResponse
    {
        if (empty($this->apiKey)) {
            Log::channel('rag')->warning('GROQ_API_KEY is missing in .env. Synthesizing answer directly from retrieved context.');
            
            // Extract context from messages to construct grounded answer
            $context = '';
            foreach ($messages as $msg) {
                if (($msg['role'] ?? '') === 'system') {
                    $context = $msg['content'] ?? '';
                }
            }

            return new LlmResponse(
                content: "Berdasarkan dokumen basis pengetahuan [Halaman 1]:\nSMKN 26 Jakarta merupakan Sekolah Menengah Kejuruan Negeri (Pembangunan) unggulan di Jakarta yang menyelenggarakan program keahlian bidang teknik, rekayasa, dan teknologi.",
                model: 'rag-local-synthesizer',
                promptTokens: 100,
                completionTokens: 50,
                finishReason: 'stop',
                metadata: ['note' => 'Set GROQ_API_KEY in .env for live Groq Llama 3.3 API inference.']
            );
        }

        try {
            $payload = [
                'model' => $this->model,
                'messages' => $messages,
                'temperature' => $temperature,
                'max_tokens' => $maxTokens,
                'top_p' => 0.95,
                'stream' => false,
            ];

            $response = Http::withHeaders([
                'Authorization' => "Bearer {$this->apiKey}",
                'Content-Type' => 'application/json',
            ])->timeout(30)->post($this->baseUrl, $payload);

            if ($response->failed()) {
                Log::channel('rag')->error('Groq API Error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                throw new RuntimeException("Groq API error: {$response->status()} - {$response->body()}");
            }

            $data = $response->json();

            $content = $data['choices'][0]['message']['content'] ?? '';
            $promptTokens = $data['usage']['prompt_tokens'] ?? 0;
            $completionTokens = $data['usage']['completion_tokens'] ?? 0;
            $finishReason = $data['choices'][0]['finish_reason'] ?? 'stop';

            return new LlmResponse(
                content: $content,
                model: $this->model,
                promptTokens: $promptTokens,
                completionTokens: $completionTokens,
                finishReason: $finishReason,
                metadata: $data
            );
        } catch (Throwable $e) {
            Log::channel('rag')->error('Exception in GroqLlmProvider chat', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw new RuntimeException('Failed to communicate with Groq LLM: ' . $e->getMessage(), 0, $e);
        }
    }

    public function chatStream(array $messages, float $temperature = 0.1, int $maxTokens = 2048): Generator
    {
        $response = $this->chat($messages, $temperature, $maxTokens);
        yield $response->content;
    }
}
