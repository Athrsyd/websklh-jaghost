<?php
declare(strict_types=1);

namespace App\DTO;

readonly class ConfidenceGateResult
{
    /**
     * @param bool $passed
     * @param string $reason (passed, low_confidence, insufficient_chunks, no_results)
     * @param array $filteredResults array of \App\DTO\RetrievalResult
     * @param float $topScore
     */
    public function __construct(
        public bool $passed,
        public string $reason,
        public array $filteredResults,
        public float $topScore
    ) {}
}