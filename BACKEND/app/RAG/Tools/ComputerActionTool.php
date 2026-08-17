<?php

declare(strict_types=1);

namespace App\RAG\Tools;

class ComputerActionTool
{
    /**
     * Get the OpenAI/Gemini compatible tool definition for Computer Use actions.
     *
     * @return array<string, mixed>
     */
    public static function getDefinition(): array
    {
        return [
            'type' => 'function',
            'function' => [
                'name' => 'computer_action',
                'description' => 'Menjalankan aksi Computer Use langsung pada browser pengguna, seperti mengklik elemen (tombol, link, tab), atau menggulir halaman (scroll ke bawah, scroll ke atas, scroll ke bagian tertentu, scroll sampai paling bawah).',
                'parameters' => [
                    'type' => 'object',
                    'properties' => [
                        'action' => [
                            'type' => 'string',
                            'enum' => ['click', 'scroll_down', 'scroll_up', 'scroll_to', 'scroll_bottom', 'scroll_top'],
                            'description' => 'Jenis aksi: click (klik elemen), scroll_down (gulir ke bawah), scroll_up (gulir ke atas), scroll_to (gulir ke bagian tertentu), scroll_bottom (gulir sampai bawah), scroll_top (gulir ke atas).',
                        ],
                        'target' => [
                            'type' => 'string',
                            'description' => 'Target teks atau nama elemen yang ingin diklik atau dituju saat scroll (misal: "Tentang Kami", "Sambutan", "Visi Misi", "TKJ", dll).',
                        ],
                        'description' => [
                            'type' => 'string',
                            'description' => 'Deskripsi singkat aksi yang dilakukan untuk disampaikan kepada pengguna.',
                        ],
                    ],
                    'required' => ['action'],
                ],
            ],
        ];
    }
}
