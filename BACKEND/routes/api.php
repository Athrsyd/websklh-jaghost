<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\ChatCompletionController;
use App\Http\Controllers\Api\DocumentController;

Route::get('/docs', function () {
    return view('api-docs');
});

Route::prefix('v1')->group(function () {
    // Health Check Endpoint
    Route::get('/health', function () {
        $dbConnected = false;
        $chunksCount = 0;
        $activeDocVersion = null;

        try {
            DB::connection()->getPdo();
            $dbConnected = true;
            $chunksCount = DB::table('chunks')->count();
            $doc = DB::table('document_versions')->where('status', 'completed')->latest()->first();
            $activeDocVersion = $doc ? $doc->id : null;
        } catch (\Throwable $e) {
            // DB error handled gracefully
        }

        return response()->json([
            'status' => $dbConnected ? 'healthy' : 'degraded',
            'timestamp' => now()->toIso8601String(),
            'environment' => config('app.env'),
            'database' => [
                'connected' => $dbConnected,
                'total_chunks' => $chunksCount,
                'active_version' => $activeDocVersion,
            ],
            'ai_infrastructure' => [
                'llm_primary' => config('rag.llm.provider'),
                'llm_model' => config('rag.llm.model'),
                'embedding_provider' => config('rag.embedding.provider'),
                'dimensions' => config('rag.embedding.dimensions'),
            ],
        ]);
    });

    // Chat completion with rate limiter (60 req/min per IP)
    Route::post('/chat/completions', [ChatCompletionController::class, 'store'])
        ->middleware('throttle:chat');

    // Document management endpoints
    Route::post('/documents/ingest', [DocumentController::class, 'ingest']);
    Route::get('/documents', [DocumentController::class, 'index']);
    Route::get('/documents/{id}/status', [DocumentController::class, 'status']);
    Route::delete('/documents/{id}', [DocumentController::class, 'destroy']);
});