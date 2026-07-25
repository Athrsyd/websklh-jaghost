<?php

declare(strict_types=1);

namespace App\Repositories;

use App\DTO\RetrievalResult;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Pgvector\Laravel\Vector;

/**
 * Class EmbeddingRepository
 * 
 * Repository for embeddings and vector search.
 */
class EmbeddingRepository
{
    public function create(string $chunkId, array $embedding, string $model, string $version, int $dimensions): void
    {
        $this->createBatch([[
            'chunk_id' => $chunkId,
            'embedding' => $embedding,
            'model' => $model,
            'model_version' => $version,
            'dimensions' => $dimensions,
        ]]);
    }

    public function createBatch(array $items): void
    {
        foreach ($items as $item) {
            $id = Str::uuid()->toString();
            $vectorStr = (string)(new Vector($item['embedding']));
            
            DB::statement(
                "INSERT INTO embeddings (id, chunk_id, embedding, model, model_version, dimensions, created_at)
                 VALUES (?, ?, ?::vector, ?, ?, ?, NOW())",
                [$id, $item['chunk_id'], $vectorStr, $item['model'], $item['model_version'], $item['dimensions']]
            );
        }
    }

    /**
     * @return array<int, RetrievalResult>
     */
    public function denseSimilaritySearch(array $queryEmbedding, string $versionId, int $limit = 50): array
    {
        $vectorStr = (string)(new Vector($queryEmbedding));

        $rows = DB::select(
            "SELECT c.*, 1 - (e.embedding <=> ?::vector) as dense_score 
             FROM embeddings e 
             JOIN chunks c ON c.id = e.chunk_id 
             WHERE c.document_version_id = ? AND c.is_parent = false 
             ORDER BY e.embedding <=> ?::vector LIMIT ?",
            [$vectorStr, $versionId, $vectorStr, $limit]
        );

        return array_map(function ($row) {
            $res = new RetrievalResult(
                chunkId: $row->id,
                text: $row->original_text,
                page: (int)$row->page_start,
                section: $row->heading ?? $row->section
            );
            $res->denseScore = (float)$row->dense_score;
            return $res;
        }, $rows);
    }

    /**
     * @return array<int, RetrievalResult>
     */
    public function sparseSearch(string $query, string $versionId, int $limit = 50): array
    {
        $cleanQuery = trim(preg_replace('/[^\w\s]/u', '', $query));
        if (empty($cleanQuery)) {
            return [];
        }

        $rows = DB::select(
            "SELECT c.*, ts_rank_cd(c.search_vector, plainto_tsquery('simple', ?)) as sparse_score
             FROM chunks c
             WHERE c.document_version_id = ? AND c.is_parent = false
               AND c.search_vector @@ plainto_tsquery('simple', ?)
             ORDER BY sparse_score DESC LIMIT ?",
            [$cleanQuery, $versionId, $cleanQuery, $limit]
        );

        return array_map(function ($row) {
            $res = new RetrievalResult(
                chunkId: $row->id,
                text: $row->original_text,
                page: (int)$row->page_start,
                section: $row->heading ?? $row->section
            );
            $res->sparseScore = (float)$row->sparse_score;
            return $res;
        }, $rows);
    }
}
