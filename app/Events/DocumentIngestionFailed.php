<?php
declare(strict_types=1);

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DocumentIngestionFailed
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly string $documentId,
        public readonly string $error,
        public readonly string $traceId
    ) {}
}