<?php
declare(strict_types=1);

namespace App\Listeners;

use Illuminate\Support\Facades\Log;

class LogIngestionProgress
{
    public function handle($event): void
    {
        Log::channel('rag')->info('Ingestion event', [
            'event' => get_class($event),
            'payload' => (array) $event
        ]);
    }
}