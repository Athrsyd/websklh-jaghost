<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\AI\Contracts\EmbeddingProviderInterface;
use App\AI\Contracts\LlmProviderInterface;
use App\AI\Contracts\RerankerProviderInterface;
use App\AI\Contracts\PdfParserInterface;
use App\AI\Providers\LocalEmbeddingProvider;
use App\AI\Providers\GroqLlmProvider;
use App\AI\Providers\GeminiLlmProvider;
use App\AI\Providers\LocalRerankerProvider;
use App\AI\Providers\PyMuPdfParserProvider;
use RuntimeException;

/**
 * Service Provider for RAG infrastructure.
 */
class RagServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../../config/rag.php', 'rag');

        $this->app->singleton(EmbeddingProviderInterface::class, function ($app) {
            $provider = config('rag.embedding.provider');
            
            if ($provider === 'local') {
                return $app->make(LocalEmbeddingProvider::class);
            }
            
            throw new RuntimeException("Unsupported embedding provider: {$provider}");
        });

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

        $this->app->singleton(RerankerProviderInterface::class, function ($app) {
            return $app->make(LocalRerankerProvider::class);
        });

        $this->app->singleton(PdfParserInterface::class, function ($app) {
            return $app->make(PyMuPdfParserProvider::class);
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
            
            // Example of registering artisan commands if needed.
            // $this->commands([
            //     \App\Console\Commands\IngestKnowledgeCommand::class,
            // ]);
        }
    }
}
