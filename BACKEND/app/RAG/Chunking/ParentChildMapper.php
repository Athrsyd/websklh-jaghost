<?php

declare(strict_types=1);

namespace App\RAG\Chunking;

use App\DTO\ChunkData;
use App\DTO\ChunkType;
use Illuminate\Support\Str;

/**
 * Class ParentChildMapper
 * 
 * Maps child chunks to parent chunks to preserve context.
 */
class ParentChildMapper
{
    /**
     * @param array<ChunkData> $chunks
     * @return array<ChunkData> Both parent and child chunks
     */
    public function map(array $chunks): array
    {
        if (empty($chunks)) {
            return [];
        }

        $grouped = [];
        foreach ($chunks as $chunk) {
            $key = $chunk->heading ?: 'Section_Default';
            $grouped[$key][] = $chunk;
        }

        $allChunks = [];
        $indexCounter = 0;

        foreach ($grouped as $heading => $sectionChunks) {
            $parentId = Str::uuid()->toString();

            $parentText = implode("\n\n", array_map(fn($c) => $c->originalText, $sectionChunks));
            $tokenCount = (int)ceil(str_word_count($parentText) * 1.3);

            $parentChunk = new ChunkData(
                id: $parentId,
                documentVersionId: $sectionChunks[0]->documentVersionId,
                parentChunkId: null,
                chunkIndex: $indexCounter++,
                chunkType: ChunkType::PARAGRAPH,
                originalText: $parentText,
                contextualHeader: null,
                heading: $heading,
                section: $heading,
                breadcrumb: $sectionChunks[0]->breadcrumb,
                pageStart: $sectionChunks[0]->pageStart,
                pageEnd: end($sectionChunks)->pageEnd,
                language: 'id',
                contentHash: hash('sha256', $parentText),
                tokenCount: $tokenCount,
                isParent: true,
                metadata: ['children_count' => count($sectionChunks)]
            );

            $allChunks[] = $parentChunk;

            foreach ($sectionChunks as $child) {
                $allChunks[] = new ChunkData(
                    id: $child->id,
                    documentVersionId: $child->documentVersionId,
                    parentChunkId: $parentId,
                    chunkIndex: $indexCounter++,
                    chunkType: $child->chunkType,
                    originalText: $child->originalText,
                    contextualHeader: $child->contextualHeader,
                    heading: $child->heading,
                    section: $child->section,
                    breadcrumb: $child->breadcrumb,
                    pageStart: $child->pageStart,
                    pageEnd: $child->pageEnd,
                    language: $child->language,
                    contentHash: $child->contentHash,
                    tokenCount: $child->tokenCount,
                    isParent: false,
                    metadata: $child->metadata
                );
            }
        }

        return $allChunks;
    }
}
