<?php
declare(strict_types=1);

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateChunkEmbeddings implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 5;
    public $backoff = [5, 15, 30, 60, 120];
    public $timeout = 300;

    public function __construct(public readonly array $chunkIds)
    {
        $this->onQueue('rag-embedding');
    }

    public function handle(): void
    {
        // Embed chunk
    }
}