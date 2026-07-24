<?php
declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\RAG\Pipeline\RagPipeline;
use Illuminate\Support\Str;

class ChatCompletionController extends Controller
{
    public function store(Request $request, RagPipeline $pipeline): JsonResponse
    {
        $validated = $request->validate([
            'messages' => 'required|array',
            'model' => 'nullable|string',
            'temperature' => 'nullable|numeric',
            'max_tokens' => 'nullable|integer',
            'stream' => 'nullable|boolean',
        ]);

        $messages = $validated['messages'];
        $lastMessage = end($messages);
        $query = $lastMessage['content'] ?? '';

        $result = $pipeline->query($query);

        return response()->json([
            'id' => 'rag-' . Str::uuid()->toString(),
            'object' => 'chat.completion',
            'created' => time(),
            'model' => $validated['model'] ?? 'rag-sekolah',
            'choices' => [
                [
                    'index' => 0,
                    'message' => [
                        'role' => 'assistant',
                        'content' => $result->answer
                    ],
                    'finish_reason' => 'stop'
                ]
            ],
            'usage' => [
                'prompt_tokens' => 0,
                'completion_tokens' => 0,
                'total_tokens' => 0
            ],
            'citations' => $result->citations,
            'retrieval_metadata' => [
                'trace_id' => $result->traceId,
                'confidence_score' => $result->confidenceScore,
                'retrieval_latency_ms' => $result->retrievalLatencyMs
            ]
        ]);
    }
}