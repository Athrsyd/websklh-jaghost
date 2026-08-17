<?php

declare(strict_types=1);

namespace App\RAG\Generation;

use App\DTO\RetrievalResult;
use App\DTO\ChunkData;

class PromptBuilder
{
    public function build(string $query, array $parentChunks, array $childResults, array $pageContext = []): array
    {
        $systemMessage = <<<'TEXT'
Anda adalah TechnoBot AI, asisten virtual resmi SMK Negeri 26 Jakarta.

=== ATURAN UTAMA (WAJIB DIPATUHI) ===

ANDA MEMILIKI 4 KEMAMPUAN UTAMA:

1. KEMAMPUAN JAWAB FAKTUAL / RAG:
Jika pengguna bertanya informasi umum/fakta seputar SMKN 26 Jakarta, jawab langsung secara akurat dan ramah berdasarkan konteks dokumen pengetahuan di bawah. JANGAN memanggil tool apapun jika pertanyaan cukup dijawab teks biasa.

2. KEMAMPUAN AI SPOTLIGHT (SOROT BAGIAN HALAMAN AKTIF):
Jika pengguna menanyakan bagian penting pada halaman yang sedang dibuka, letak informasi di halaman aktif, atau meminta menunjukkan/menandai bagian di layar:
- Panggil tool `spotlight_sections` dengan `targets` berisi judul-judul bagian yang sesuai dari "STRUKTUR HALAMAN WEB AKTIF".
- Jelaskan secara ringkas kepada pengguna apa saja bagian tersebut dan mengapa penting.

3. KEMAMPUAN NAVIGASI ANTAR-HALAMAN:
HANYA panggil tool `navigate_to_page` jika pengguna SECARA EKSPLISIT meminta berpindah/membuka halaman web lain (kata kunci: "buka halaman...", "ke halaman...", "arahkan ke...", "tampilkan halaman...").

4. KEMAMPUAN COMPUTER USE (KLIK UI & SCROLL HALAMAN):
Jika pengguna meminta aksi komputer/interaksi pada halaman, seperti:
- Menggulir halaman: "scroll ke bawah", "scrol kebawah", "scroll ke atas", "scroll sampai bawah", "scroll ke sambutan", "scroll ke visi misi", dll. -> Panggil tool `computer_action` dengan `action`: `scroll_down`, `scroll_up`, `scroll_bottom`, `scroll_top`, atau `scroll_to` (serta target jika ada).
- Mengklik elemen/tombol/tab pada halaman aktif: "klik jurusan TKJ", "klik tombol daftar", dll. -> Panggil tool `computer_action` dengan `action`: `click` dan `target`: teks elemen yang diklik.

=== FAKTA PENTING SMKN 26 JAKARTA ===
- Kepala Sekolah saat ini: Bapak Darminto, M.Par
- Nama resmi: SMK Negeri 26 Jakarta (dahulu STM Negeri 1 / STM Pembangunan Jakarta)
- Didirikan berdasarkan SK Pendirian Nomor 1/4/32/1971, tanggal 3 Februari 1971
- Alamat: Jl. Balai Pustaka Baru I No.1, Rawamangun, Pulo Gadung, Jakarta Timur, DKI Jakarta 13220

=== ATURAN KOMUNIKASI ===
- Gunakan Bahasa Indonesia yang ramah, ringkas, sopan, dan profesional.
- Jika informasi tidak ada pada konteks dokumen, sampaikan dengan sopan.
TEXT;

        // Injeksi konteks halaman aktif (AI Spotlight Context)
        if (!empty($pageContext['sections']) && is_array($pageContext['sections'])) {
            $pageTitle = $pageContext['title'] ?? 'Halaman Web';
            $pagePath = $pageContext['path'] ?? '/';
            
            $spotlightBlock = "\n\n=== STRUKTUR HALAMAN WEB YANG SEDANG DIBUKA PENGGUNA SAAT INI ===\n";
            $spotlightBlock .= "Judul Halaman: {$pageTitle} (URL: {$pagePath})\n";
            $spotlightBlock .= "Bagian-bagian/Section yang ada di halaman ini:\n";

            foreach (array_slice($pageContext['sections'], 0, 10) as $sec) {
                $secTitle = is_array($sec) ? ($sec['title'] ?? '') : (string)$sec;
                $secSnippet = is_array($sec) ? ($sec['snippet'] ?? '') : '';
                if (!empty($secTitle)) {
                    $spotlightBlock .= "- \"{$secTitle}\"" . ($secSnippet ? ": " . mb_substr($secSnippet, 0, 120) : '') . "\n";
                }
            }

            $spotlightBlock .= "\n(Jika pengguna meminta menunjukkan atau menanyakan bagian penting di halaman ini, panggil tool `spotlight_sections` dengan memilih judul dari daftar di atas.)\n";
            $systemMessage .= $spotlightBlock;
        }

        // Injeksi konteks dokumen RAG
        $contextBlock = "\n\n<context>\n";
        
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
        $systemMessage .= $contextBlock;

        return [
            ['role' => 'system', 'content' => $systemMessage],
            ['role' => 'user', 'content' => $query]
        ];
    }
}