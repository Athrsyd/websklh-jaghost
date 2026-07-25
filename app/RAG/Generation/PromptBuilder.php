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
Anda adalah asisten AI TechnoBot SMKN 26 Jakarta yang menjawab pertanyaan HANYA berdasarkan konteks yang diberikan.

ATURAN KETAT:
1. Jawab HANYA berdasarkan informasi dari konteks di bawah ini.
2. Jika pengguna menanyakan lokasi halaman, lagu mars, jurusan, pendaftaran, atau kontak, Anda DAPAN menggunakan function tool `navigate_to_page` untuk menentukan rute halaman dan section.
3. Jika informasi tidak ada dalam konteks dan bukan pertanyaan navigasi, katakan: "Informasi tersebut tidak ditemukan dalam basis pengetahuan."
4. JANGAN membuat informasi palsu yang tidak ada dalam konteks.
5. Sertakan nomor halaman sumber dalam format [Halaman X] jika mengambil dari dokumen.
6. Jawab dengan ramah, singkat, dan tepat sasaran (hemat token).
TEXT;

        $contextBlock = "<context>\n";
        
        // Pilih maksimal 3 child chunk paling relevan untuk menghemat token
        $relevantChunks = array_slice($childResults, 0, 3);
        
        // Jika child chunk kosong, gunakan max 1 parent chunk
        if (empty($relevantChunks) && !empty($parentChunks)) {
            $relevantChunks = array_slice($parentChunks, 0, 1);
        }

        $uniqueChunks = [];

        foreach ($relevantChunks as $c) {
            $id = $c instanceof RetrievalResult ? $c->chunkId : ($c instanceof ChunkData ? $c->id : null);
            if ($id && !isset($uniqueChunks[$id])) {
                $uniqueChunks[$id] = $c;
                
                $page = $c instanceof RetrievalResult ? $c->page : ($c instanceof ChunkData ? $c->pageStart : 1);
                $heading = $c instanceof RetrievalResult ? ($c->section ?? '') : ($c instanceof ChunkData ? ($c->heading ?? '') : '');
                $text = $c instanceof RetrievalResult ? $c->text : ($c instanceof ChunkData ? $c->originalText : '');
                
                // Potong teks jika terlalu panjang (max 800 karakter per chunk)
                $trimmedText = mb_substr($text, 0, 800);
                
                $contextBlock .= "[Sumber - Halaman {$page} - Bagian: {$heading}]\n{$trimmedText}\n\n";
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