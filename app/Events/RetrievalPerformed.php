<?php
declare(strict_types=1);

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RetrievalPerformed
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly string $traceId,
        public readonly string $query,
        public readonly int $chunksRetrieved,
        public readonly float $confidenceScore
    ) {}
}