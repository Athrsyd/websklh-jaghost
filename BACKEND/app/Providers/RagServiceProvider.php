<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\AI\Contracts\EmbeddingProviderInterface;
use App\AI\Contracts\LlmProviderInterface;
use App\AI\Contracts\RerankerProviderInterface;
use App\AI\Contracts\PdfParserInterface;
use App\AI\Providers\GeminiEmbeddingProvider;
use App\AI\Providers\FallbackLlmProvider;
use App\AI\Providers\PhpCosineRerankerProvider;
use App\AI\Providers\PhpPdfParserProvider;

/**
 * Service Provider for RAG infrastructure.
 * All providers are pure PHP — no Python dependency.
 */
class RagServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../../config/rag.php', 'rag');

        // Embedding: Gemini Embedding API (384 dimensions)
        $this->app->singleton(EmbeddingProviderInterface::class, GeminiEmbeddingProvider::class);

        // LLM: Resilient High-Availability Fallback LLM (Groq + Gemini)
        $this->app->singleton(LlmProviderInterface::class, FallbackLlmProvider::class);

        // Reranker: Pure PHP cosine similarity
        $this->app->singleton(RerankerProviderInterface::class, PhpCosineRerankerProvider::class);

        // PDF Parser: Pure PHP smalot/pdfparser
        $this->app->singleton(PdfParserInterface::class, PhpPdfParserProvider::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../../config/rag.php' => config_path('rag.php'),
            ], 'rag-config');
        }
    }
}
