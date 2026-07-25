<?php

declare(strict_types=1);

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\RAG\Ingestion\IngestionOrchestrator;
use App\Events\DocumentIngestionCompleted;
use App\Events\DocumentIngestionFailed;
use Illuminate\Support\Facades\Log;

class ProcessDocumentIngestion implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;
    public $backoff = [30, 60, 120];
    public $timeout = 600;

    public function __construct(
        public readonly string $documentId,
        public readonly string $filePath
    ) {
        $this->onQueue('rag-ingestion');
    }

    public function handle(IngestionOrchestrator $orchestrator): void
    {
        Log::channel('rag')->info("Job ProcessDocumentIngestion started for document: {$this->documentId}");
        
        $progress = $orchestrator->ingest($this->filePath, $this->documentId);

        event(new DocumentIngestionCompleted(
            $progress->documentId,
            $progress->documentVersionId,
            $progress->totalChunks,
            $progress->durationMs
        ));
    }

    public function failed(\Throwable $exception): void
    {
        Log::channel('rag')->error("Job ProcessDocumentIngestion failed for document: {$this->documentId}", [
            'error' => $exception->getMessage(),
        ]);

        event(new DocumentIngestionFailed($this->documentId, $exception->getMessage(), 'trace-failed'));
    }
}