<?php
declare(strict_types=1);

namespace App\RAG\Retrieval;

use App\DTO\RetrievalResult;

class ReciprocalRankFusion
{
    /**
     * @param RetrievalResult[] $denseResults
     * @param RetrievalResult[] $sparseResults
     * @param int $k
     * @return RetrievalResult[]
     */
    public function fuse(array $denseResults, array $sparseResults, int $k = 60): array
    {
        $map = [];
        
        $process = function(array $results, string $type) use (&$map) {
            foreach ($results as $index => $result) {
                $id = $result->chunkId;
                if (!isset($map[$id])) {
                    $map[$id] = [
                        'item' => $result,
                        'dense_rank' => 1000,
                        'sparse_rank' => 1000
                    ];
                }
                if ($type === 'dense') {
                    $map[$id]['dense_rank'] = $index + 1;
                } else {
                    $map[$id]['sparse_rank'] = $index + 1;
                }
            }
        };

        $process($denseResults, 'dense');
        $process($sparseResults, 'sparse');

        $fused = [];
        foreach ($map as $id => $data) {
            $rrfScore = 0.0;
            if ($data['dense_rank'] < 1000) {
                $rrfScore += 1.0 / ($k + $data['dense_rank']);
            }
            if ($data['sparse_rank'] < 1000) {
                $rrfScore += 1.0 / ($k + $data['sparse_rank']);
            }
            
            $item = $data['item'];
            $item->rrfScore = $rrfScore;
            $fused[] = $item;
        }

        usort($fused, fn(RetrievalResult $a, RetrievalResult $b) => $b->rrfScore <=> $a->rrfScore);

        return $fused;
    }
}