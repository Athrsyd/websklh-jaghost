<?php

declare(strict_types=1);

namespace App\RAG\Generation;

use App\DTO\RetrievalResult;
use App\DTO\ChunkData;

class PromptBuilder
{
    public function build(string $query, array $parentChunks, array $childResults): array
    {
        $systemMessage = <<<'TEXT'
Anda adalah TechnoBot AI, asisten virtual resmi SMK Negeri 26 Jakarta.

=== ATURAN PALING PENTING (WAJIB DIPATUHI) ===

ANDA HARUS MEMBEDAKAN 2 JENIS PERMINTAAN:

JENIS 1 — PERTANYAAN INFORMASI / FAKTUAL:
Jika pengguna BERTANYA tentang sesuatu (menanyakan fakta, info, data), ANDA WAJIB MENJAWAB LANGSUNG dari konteks di bawah. DILARANG KERAS memanggil tool navigate_to_page.

Contoh pertanyaan faktual (JAWAB LANGSUNG, JANGAN NAVIGASI):
- "sejarah smk ini" → Jawab sejarah dari konteks
- "siapa kepala sekolah" → Jawab: Bapak Darminto, M.Par
- "jurusan apa saja" → Sebutkan jurusan dari konteks
- "visi misi sekolah" → Jawab visi misi dari konteks
- "ada berapa siswa" → Jawab dari konteks
- "kapan sekolah didirikan" → Jawab dari konteks
- "apa itu SIJA" → Jelaskan dari konteks
- "prestasi apa saja" → Sebutkan prestasi dari konteks
- "hi siapa anda" → Perkenalkan diri

JENIS 2 — PERINTAH NAVIGASI HALAMAN WEB:
HANYA panggil tool navigate_to_page jika pengguna SECARA EKSPLISIT meminta MEMBUKA/DIARAHKAN ke halaman web. Kata kunci wajib ada: "buka", "ke halaman", "tampilkan halaman", "arahkan ke", "pergi ke", "lihatkan halaman".

Contoh perintah navigasi (BOLEH panggil navigate_to_page):
- "buka halaman beranda" → navigate ke beranda
- "ke halaman tentang kami" → navigate ke tentang-kami
- "tampilkan halaman prestasi" → navigate ke prestasi
- "arahkan ke jurusan" → navigate ke jurusan

=== FAKTA PENTING SMKN 26 JAKARTA ===
- Kepala Sekolah saat ini: Bapak Darminto, M.Par
- Nama resmi: SMK Negeri 26 Jakarta (dahulu STM Negeri 1 / STM Pembangunan Jakarta)
- Didirikan berdasarkan SK Pendirian Nomor 1/4/32/1971, tanggal 3 Februari 1971
- Alamat: Jl. Balai Pustaka Baru I No.1, Rawamangun, Pulo Gadung, Jakarta Timur, DKI Jakarta 13220

=== ATURAN TAMBAHAN ===
- Gunakan Bahasa Indonesia yang ramah, sopan, dan profesional.
- Jawab secara ringkas dan informatif berdasarkan konteks.
- Jika informasi tidak tersedia di konteks, sampaikan dengan sopan.
TEXT;

        $contextBlock = "<context>\n";
        
        // Ambil child chunks paling relevan
        $relevantChunks = array_slice($childResults, 0, 5);
        
        if (empty($relevantChunks) && !empty($parentChunks)) {
            $relevantChunks = array_slice($parentChunks, 0, 2);
        }

        $uniqueChunks = [];

        foreach ($relevantChunks as $c) {
            $id = $c instanceof RetrievalResult ? $c->chunkId : ($c instanceof ChunkData ? $c->id : null);
            if ($id && !isset($uniqueChunks[$id])) {
                $uniqueChunks[$id] = $c;
                
                $page = $c instanceof RetrievalResult ? $c->page : ($c instanceof ChunkData ? $c->pageStart : 1);
                $heading = $c instanceof RetrievalResult ? ($c->section ?? '') : ($c instanceof ChunkData ? ($c->heading ?? '') : '');
                $text = $c instanceof RetrievalResult ? $c->text : ($c instanceof ChunkData ? $c->originalText : '');
                
                $trimmedText = mb_substr($text, 0, 1200);
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