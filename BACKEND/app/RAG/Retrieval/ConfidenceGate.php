<?php
declare(strict_types=1);

namespace App\RAG\Retrieval;

use App\DTO\ConfidenceGateResult;
use App\DTO\RetrievalResult;

class ConfidenceGate
{
    private float $minScore;
    private int $minChunks;

    public function __construct()
    {
        $this->minScore = (float) config('rag.confidence.min_score', 0.02);
        $this->minChunks = (int) config('rag.confidence.min_chunks', 1);
    }

    /**
     * @param RetrievalResult[] $results
     * @return ConfidenceGateResult
     */
    public function gate(array $results): ConfidenceGateResult
    {
        if (empty($results)) {
            return new ConfidenceGateResult(false, 'no_results', [], 0.0);
        }

        $topScore = $results[0]->rrfScore ?? 0.0;
        
        if ($topScore < $this->minScore) {
            return new ConfidenceGateResult(false, 'low_confidence', [], $topScore);
        }
        
        if (count($results) < $this->minChunks) {
            return new ConfidenceGateResult(true, 'insufficient_chunks', $results, $topScore);
        }

        return new ConfidenceGateResult(true, 'passed', $results, $topScore);
    }
}