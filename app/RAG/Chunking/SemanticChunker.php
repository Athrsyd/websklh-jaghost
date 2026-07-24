<?php

declare(strict_types=1);

namespace App\RAG\Chunking;

use App\RAG\Ingestion\DocumentStructure;
use App\DTO\ChunkData;
use App\DTO\ChunkType;
use Illuminate\Support\Str;

/**
 * Class SemanticChunker
 * 
 * Chunks documents by structural boundaries.
 */
class SemanticChunker
{
    /**
     * @param DocumentStructure $structure
     * @return array<ChunkData>
     */
    public function chunk(DocumentStructure $structure): array
    {
        $maxTokens = (int)config('rag.chunking.max_tokens', 512);
        $minTokens = (int)config('rag.chunking.min_tokens', 100);
        $chunks = [];
        $chunkIndex = 0;

        foreach ($structure->sections as $section) {
            $sectionText = trim($section['text'] ?? '');
            if (empty($sectionText)) {
                continue;
            }

            $heading = $section['heading'] ?? null;
            $breadcrumb = $section['breadcrumb'] ?? null;
            $pageStart = $section['pageStart'] ?? 1;
            $pageEnd = $section['pageEnd'] ?? 1;

            $paragraphs = explode("\n\n", $sectionText);
            $currentChunkText = '';

            foreach ($paragraphs as $para) {
                $para = trim($para);
                if (empty($para)) {
                    continue;
                }

                $combinedText = empty($currentChunkText) ? $para : $currentChunkText . "\n\n" . $para;
                $tokenCount = (int)ceil(str_word_count($combinedText) * 1.3);

                if ($tokenCount > $maxTokens && !empty($currentChunkText)) {
                    $chunks[] = $this->makeChunk(
                        chunkIndex: $chunkIndex++,
                        text: trim($currentChunkText),
                        heading: $heading,
                        breadcrumb: $breadcrumb,
                        pageStart: $pageStart,
                        pageEnd: $pageEnd
                    );
                    $currentChunkText = $para;
                } else {
                    $currentChunkText = $combinedText;
                }
            }

            if (!empty(trim($currentChunkText))) {
                $chunks[] = $this->makeChunk(
                    chunkIndex: $chunkIndex++,
                    text: trim($currentChunkText),
                    heading: $heading,
                    breadcrumb: $breadcrumb,
                    pageStart: $pageStart,
                    pageEnd: $pageEnd
                );
            }
        }

        return $chunks;
    }

    private function makeChunk(
        int $chunkIndex,
        string $text,
        ?string $heading,
        ?string $breadcrumb,
        int $pageStart,
        int $pageEnd
    ): ChunkData {
        $tokenCount = (int)ceil(str_word_count($text) * 1.3);

        $chunkType = ChunkType::PARAGRAPH;
        if (str_contains($text, '|')) {
            $chunkType = ChunkType::TABLE;
        } elseif (preg_match('/^[\-\*\d\.]+\s/m', $text)) {
            $chunkType = ChunkType::LIST_ITEM;
        }

        return new ChunkData(
            id: Str::uuid()->toString(),
            documentVersionId: '',
            parentChunkId: null,
            chunkIndex: $chunkIndex,
            chunkType: $chunkType,
            originalText: $text,
            contextualHeader: null,
            heading: $heading,
            section: $heading,
            breadcrumb: $breadcrumb,
            pageStart: $pageStart,
            pageEnd: $pageEnd,
            language: 'id',
            contentHash: hash('sha256', $text),
            tokenCount: $tokenCount,
            isParent: false,
            metadata: []
        );
    }
}
