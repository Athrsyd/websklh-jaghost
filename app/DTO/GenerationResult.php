<?php
declare(strict_types=1);

namespace App\DTO;

readonly class GenerationResult
{
    public function __construct(
        public string $answer,
        public array $citations,
        public float $confidenceScore,
        public float $retrievalLatencyMs,
        public string $traceId
    ) {}
}