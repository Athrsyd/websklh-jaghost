<?php

declare(strict_types=1);

namespace App\Repositories;

use App\DTO\ChunkData;
use App\DTO\ChunkType;
use Illuminate\Support\Facades\DB;

/**
 * Class ChunkRepository
 * 
 * Repository for chunks.
 */
class ChunkRepository
{
    public function create(ChunkData $chunk): void
    {
        $this->createBatch([$chunk]);
    }

    /**
     * @param array<int, ChunkData> $chunks
     */
    public function createBatch(array $chunks): void
    {
        $records = [];
        $now = now();

        foreach ($chunks as $chunk) {
            $records[] = [
                'id' => $chunk->id,
                'document_version_id' => $chunk->documentVersionId,
                'parent_chunk_id' => $chunk->parentChunkId,
                'chunk_index' => $chunk->chunkIndex,
                'chunk_type' => $chunk->chunkType instanceof ChunkType ? $chunk->chunkType->value : (string)$chunk->chunkType,
                'original_text' => $chunk->originalText,
                'contextual_header' => $chunk->contextualHeader,
                'heading' => $chunk->heading,
                'section' => $chunk->section,
                'breadcrumb' => $chunk->breadcrumb,
                'page_start' => $chunk->pageStart,
                'page_end' => $chunk->pageEnd,
                'language' => $chunk->language,
                'content_hash' => $chunk->contentHash,
                'token_count' => $chunk->tokenCount,
                'is_parent' => $chunk->isParent,
                'metadata' => json_encode($chunk->metadata),
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        foreach (array_chunk($records, 100) as $batch) {
            DB::table('chunks')->insert($batch);
        }
    }

    public function findByDocumentVersion(string $versionId): array
    {
        $rows = DB::table('chunks')->where('document_version_id', $versionId)->get();
        return array_map(fn($row) => $this->mapRowToChunkData($row), $rows->all());
    }

    public function findParentChunks(string $versionId): array
    {
        $rows = DB::table('chunks')
            ->where('document_version_id', $versionId)
            ->where('is_parent', true)
            ->get();

        return array_map(fn($row) => $this->mapRowToChunkData($row), $rows->all());
    }

    public function findChildrenOf(string $parentId): array
    {
        $rows = DB::table('chunks')->where('parent_chunk_id', $parentId)->get();
        return array_map(fn($row) => $this->mapRowToChunkData($row), $rows->all());
    }

    public function findByIds(array $ids): array
    {
        if (empty($ids)) {
            return [];
        }

        $rows = DB::table('chunks')->whereIn('id', $ids)->get();
        return array_map(fn($row) => $this->mapRowToChunkData($row), $rows->all());
    }

    private function mapRowToChunkData(object $row): ChunkData
    {
        return new ChunkData(
            id: $row->id,
            documentVersionId: $row->document_version_id,
            parentChunkId: $row->parent_chunk_id,
            chunkIndex: (int)$row->chunk_index,
            chunkType: ChunkType::tryFrom($row->chunk_type) ?? ChunkType::PARAGRAPH,
            originalText: $row->original_text,
            contextualHeader: $row->contextual_header,
            heading: $row->heading,
            section: $row->section,
            breadcrumb: $row->breadcrumb,
            pageStart: (int)$row->page_start,
            pageEnd: (int)$row->page_end,
            language: $row->language,
            contentHash: $row->content_hash,
            tokenCount: (int)$row->token_count,
            isParent: (bool)$row->is_parent,
            metadata: json_decode($row->metadata ?? '{}', true)
        );
    }
}
