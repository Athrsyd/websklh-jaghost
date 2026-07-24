<?php

declare(strict_types=1);

namespace App\RAG\Generation;

use App\DTO\RetrievalResult;
use App\DTO\ChunkData;

class PromptBuilder
{
    public function build(string $query, array $parentChunks, array $childResults): array
    {
        $systemMessage = <<<TEXT
Anda adalah asisten AI yang menjawab pertanyaan HANYA berdasarkan konteks yang diberikan.

ATURAN KETAT:
1. Jawab HANYA berdasarkan informasi dari konteks di bawah ini.
2. Jika informasi tidak ada dalam konteks, katakan: "Informasi tersebut tidak ditemukan dalam basis pengetahuan."
3. JANGAN membuat informasi yang tidak ada dalam konteks.
4. Sertakan nomor halaman sumber dalam format [Halaman X].
5. Jawab dalam bahasa yang sama dengan pertanyaan.
TEXT;

        $contextBlock = "<context>\n";
        
        $allChunks = array_merge($parentChunks, $childResults);
        $uniqueChunks = [];

        foreach ($allChunks as $c) {
            $id = $c instanceof RetrievalResult ? $c->chunkId : ($c instanceof ChunkData ? $c->id : null);
            if ($id && !isset($uniqueChunks[$id])) {
                $uniqueChunks[$id] = $c;
                
                $page = $c instanceof RetrievalResult ? $c->page : ($c instanceof ChunkData ? $c->pageStart : 1);
                $heading = $c instanceof RetrievalResult ? ($c->section ?? '') : ($c instanceof ChunkData ? ($c->heading ?? '') : '');
                $text = $c instanceof RetrievalResult ? $c->text : ($c instanceof ChunkData ? $c->originalText : '');
                
                $contextBlock .= "[Sumber - Halaman {$page} - Bagian: {$heading}]\n{$text}\n\n";
            }
        }
        
        $contextBlock .= "</context>";
        $systemMessage .= "\n\n" . $contextBlock;

        return [
            ['role' => 'system', 'content' => $systemMessage],
            ['role' => 'user', 'content' => $query]
        ];
    }
}