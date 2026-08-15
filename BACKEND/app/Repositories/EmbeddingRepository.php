<?php

declare(strict_types=1);

namespace App\Repositories;

use App\DTO\EmbeddingData;
use App\DTO\RetrievalResult;
use Pgvector\Laravel\Vector;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EmbeddingRepository
{
    public function save(EmbeddingData $embedding): void
    {
        DB::table('embeddings')->insert([
            'id' => $embedding->id,
            'chunk_id' => $embedding->chunkId,
            'embedding' => new Vector($embedding->embedding),
            'model' => $embedding->model,
            'model_version' => $embedding->modelVersion,
            'dimensions' => $embedding->dimensions,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function createBatch(array $records): void
    {
        $now = now();
        $formatted = array_map(function ($r) use ($now) {
            return [
                'id' => Str::uuid()->toString(),
                'chunk_id' => $r['chunk_id'],
                'embedding' => new Vector($r['embedding']),
                'model' => $r['model'],
                'model_version' => $r['model_version'] ?? 'v1',
                'dimensions' => $r['dimensions'] ?? 384,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }, $records);

        foreach (array_chunk($formatted, 50) as $batch) {
            DB::table('embeddings')->insert($batch);
        }
    }

    /**
     * @return array<int, RetrievalResult>
     */
    public function denseSimilaritySearch(array $queryEmbedding, ?string $versionId = null, int $limit = 50): array
    {
        if (empty($queryEmbedding)) {
            return [];
        }

        $vectorStr = (string)(new Vector($queryEmbedding));

        if (empty($versionId) || $versionId === 'default' || !Str::isUuid($versionId)) {
            $latest = DB::table('document_versions')->where('status', 'completed')->latest()->first();
            $versionId = $latest ? $latest->id : null;
        }

        if ($versionId) {
            $rows = DB::select(
                "SELECT c.*, 1 - (e.embedding <=> ?::vector) as dense_score 
                 FROM embeddings e 
                 JOIN chunks c ON c.id = e.chunk_id 
                 WHERE c.document_version_id = ? AND c.is_parent = false 
                 ORDER BY e.embedding <=> ?::vector LIMIT ?",
                [$vectorStr, $versionId, $vectorStr, $limit]
            );
        } else {
            $rows = DB::select(
                "SELECT c.*, 1 - (e.embedding <=> ?::vector) as dense_score 
                 FROM embeddings e 
                 JOIN chunks c ON c.id = e.chunk_id 
                 WHERE c.is_parent = false 
                 ORDER BY e.embedding <=> ?::vector LIMIT ?",
                [$vectorStr, $vectorStr, $limit]
            );
        }

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
    public function sparseSearch(string $query, ?string $versionId = null, int $limit = 50): array
    {
        $cleanQuery = trim(preg_replace('/[^\w\s]/u', '', $query));
        if (empty($cleanQuery)) {
            return [];
        }

        if (empty($versionId) || $versionId === 'default' || !Str::isUuid($versionId)) {
            $latest = DB::table('document_versions')->where('status', 'completed')->latest()->first();
            $versionId = $latest ? $latest->id : null;
        }

        if ($versionId) {
            $rows = DB::select(
                "SELECT c.*, ts_rank_cd(c.search_vector, plainto_tsquery('simple', ?)) as sparse_score
                 FROM chunks c
                 WHERE c.document_version_id = ? AND c.is_parent = false
                   AND c.search_vector @@ plainto_tsquery('simple', ?)
                 ORDER BY sparse_score DESC LIMIT ?",
                [$cleanQuery, $versionId, $cleanQuery, $limit]
            );
        } else {
            $rows = DB::select(
                "SELECT c.*, ts_rank_cd(c.search_vector, plainto_tsquery('simple', ?)) as sparse_score
                 FROM chunks c
                 WHERE c.is_parent = false
                   AND c.search_vector @@ plainto_tsquery('simple', ?)
                 ORDER BY sparse_score DESC LIMIT ?",
                [$cleanQuery, $cleanQuery, $limit]
            );
        }

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
