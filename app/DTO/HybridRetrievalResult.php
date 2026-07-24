<?php
declare(strict_types=1);

namespace App\DTO;

readonly class HybridRetrievalResult
{
    public function __construct(
        public array $results,
        public array $parentChunks,
        public ConfidenceGateResult $gateResult,
        public int $denseCount,
        public int $sparseCount,
        public int $fusedCount,
        public int $rerankedCount,
        public float $latencyMs,
        public string $traceId
    ) {}
}