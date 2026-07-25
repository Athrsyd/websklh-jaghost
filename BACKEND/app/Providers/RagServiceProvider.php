<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\AI\Contracts\EmbeddingProviderInterface;
use App\AI\Contracts\LlmProviderInterface;
use App\AI\Contracts\RerankerProviderInterface;
use App\AI\Contracts\PdfParserInterface;
use App\AI\Providers\GeminiEmbeddingProvider;
use App\AI\Providers\GroqLlmProvider;
use App\AI\Providers\GeminiLlmProvider;
use App\AI\Providers\PhpCosineRerankerProvider;
use App\AI\Providers\PhpPdfParserProvider;
use RuntimeException;

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

        // Embedding: HuggingFace free Inference API (pure HTTP)
        $this->app->singleton(EmbeddingProviderInterface::class, function ($app) {
            return $app->make(GeminiEmbeddingProvider::class);
        });

        // LLM: Groq or Gemini
        $this->app->singleton(LlmProviderInterface::class, function ($app) {
            $provider = config('rag.llm.provider');
            
            if ($provider === 'groq') {
                return $app->make(GroqLlmProvider::class);
            }
            
            if ($provider === 'gemini') {
                return $app->make(GeminiLlmProvider::class);
            }
            
            throw new RuntimeException("Unsupported LLM provider: {$provider}");
        });

        // Reranker: Pure PHP cosine similarity
        $this->app->singleton(RerankerProviderInterface::class, function ($app) {
            return $app->make(PhpCosineRerankerProvider::class);
        });

        // PDF Parser: Pure PHP smalot/pdfparser
        $this->app->singleton(PdfParserInterface::class, function ($app) {
            return $app->make(PhpPdfParserProvider::class);
        });
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
