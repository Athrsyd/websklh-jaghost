<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Cache\RateLimiting\Limit;

use App\AI\Contracts\LlmProviderInterface;
use App\AI\Contracts\EmbeddingProviderInterface;
use App\AI\Contracts\RerankerProviderInterface;
use App\AI\Contracts\PdfParserInterface;

use App\AI\Providers\FallbackLlmProvider;
use App\AI\Providers\GeminiEmbeddingProvider;
use App\AI\Providers\PhpRerankerProvider;
use App\AI\Providers\PhpPdfParserProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // High-Availability LLM Provider with automatic failover
        $this->app->singleton(LlmProviderInterface::class, FallbackLlmProvider::class);

        // Vector Embedding Provider (384 dimensions)
        $this->app->singleton(EmbeddingProviderInterface::class, GeminiEmbeddingProvider::class);

        // Pure PHP In-Memory Reranker Provider
        $this->app->singleton(RerankerProviderInterface::class, PhpRerankerProvider::class);

        // Pure PHP PDF Parser Provider
        $this->app->singleton(PdfParserInterface::class, PhpPdfParserProvider::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configure Rate Limiting for Chatbot API (60 req/min per IP)
        RateLimiter::for('chat', function (Request $request) {
            return Limit::perMinute(60)->by($request->ip() ?: 'anonymous')->response(function () {
                return response()->json([
                    'error' => [
                        'message' => 'Terlalu banyak permintaan. Silakan tunggu 1 menit sebelum mengirim pesan lagi.',
                        'type' => 'rate_limit_exceeded',
                        'code' => 429
                    ]
                ], 429);
            });
        });
    }
}
