<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\RAG\Pipeline\RagPipeline;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Throwable;

class ChatCompletionController extends Controller
{
    public function store(Request $request, RagPipeline $pipeline): JsonResponse
    {
        $validated = $request->validate([
            'messages' => 'required|array|min:1',
            'messages.*.role' => 'required|string|in:user,assistant,system',
            'messages.*.content' => 'required|string|max:1000',
            'page_context' => 'nullable|array',
            'model' => 'nullable|string|max:100',
            'temperature' => 'nullable|numeric|min:0|max:2',
            'max_tokens' => 'nullable|integer|min:1|max:4096',
            'stream' => 'nullable|boolean',
        ]);

        try {
            $messages = $validated['messages'];
            $pageContext = $request->input('page_context', []);
            
            // Find the last user message
            $userMessages = array_filter($messages, fn($m) => ($m['role'] ?? '') === 'user');
            $lastUserMessage = end($userMessages);
            $query = trim($lastUserMessage['content'] ?? '');

            if (empty($query)) {
                return response()->json([
                    'error' => [
                        'message' => 'Pesan pengguna tidak boleh kosong.',
                        'type' => 'invalid_request_error',
                        'code' => 422,
                    ]
                ], 422);
            }

            $result = $pipeline->query($query, null, $pageContext);

            $messagePayload = [
                'role' => 'assistant',
                'content' => $result->answer,
            ];

            if (!empty($result->toolCalls)) {
                $messagePayload['tool_calls'] = $result->toolCalls;
            }

            return response()->json([
                'id' => 'rag-' . Str::uuid()->toString(),
                'object' => 'chat.completion',
                'created' => time(),
                'model' => $validated['model'] ?? 'technobot-rag-v1',
                'choices' => [
                    [
                        'index' => 0,
                        'message' => $messagePayload,
                        'finish_reason' => $result->finishReason,
                    ]
                ],
                'usage' => [
                    'prompt_tokens' => 0,
                    'completion_tokens' => 0,
                    'total_tokens' => 0,
                ],
                'citations' => $result->citations,
                'retrieval_metadata' => [
                    'trace_id' => $result->traceId,
                    'confidence_score' => $result->confidenceScore,
                    'retrieval_latency_ms' => $result->retrievalLatencyMs,
                ]
            ]);
        } catch (Throwable $e) {
            Log::channel('rag')->error('Unhandled exception in ChatCompletionController', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'id' => 'rag-err-' . Str::uuid()->toString(),
                'object' => 'chat.completion',
                'created' => time(),
                'model' => 'technobot-rag-v1',
                'choices' => [
                    [
                        'index' => 0,
                        'message' => [
                            'role' => 'assistant',
                            'content' => 'Maaf, terjadi kendala teknis sementara. Silakan coba ajukan pertanyaan Anda kembali.',
                        ],
                        'finish_reason' => 'error',
                    ]
                ],
                'citations' => [],
                'retrieval_metadata' => [
                    'trace_id' => 'rag-err',
                    'confidence_score' => 0.0,
                    'retrieval_latency_ms' => 0,
                ],
                'error_detail' => app()->environment('local') ? $e->getMessage() : null,
            ], 200);
        }
    }
}