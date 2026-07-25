<?php
declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\ProcessDocumentIngestion;
use Illuminate\Support\Str;

class IngestDocumentCommand extends Command
{
    protected $signature = 'rag:ingest {path=storage/app/knowledge/sekolah.pdf} {--sync}';
    protected $description = 'Ingest a document into RAG system';

    public function handle(): int
    {
        $path = $this->argument('path');
        if (!file_exists(base_path($path))) {
            $this->error("File not found: $path");
            return 1;
        }

        $id = Str::uuid()->toString();
        $this->info("Starting ingestion for $path (ID: $id)");

        if ($this->option('sync')) {
            ProcessDocumentIngestion::dispatchSync($id, $path);
        } else {
            ProcessDocumentIngestion::dispatch($id, $path);
        }

        $this->info("Ingestion dispatched.");
        return 0;
    }
}