<?php

declare(strict_types=1);

namespace App\RAG\Tools;

class SpotlightTool
{
    /**
     * Get the OpenAI/Gemini compatible tool definition for on-page section spotlighting.
     *
     * @return array<string, mixed>
     */
    public static function getDefinition(): array
    {
        return [
            'type' => 'function',
            'function' => [
                'name' => 'spotlight_sections',
                'description' => 'Menyorot (highlight/spotlight) secara visual satu atau beberapa bagian/elemen pada halaman web yang sedang dibuka pengguna saat pengguna menanyakan bagian penting di halaman ini, menanyakan letak konten di halaman, atau meminta ditunjukkan bagian tertentu.',
                'parameters' => [
                    'type' => 'object',
                    'properties' => [
                        'targets' => [
                            'type' => 'array',
                            'items' => [
                                'type' => 'string',
                            ],
                            'description' => 'Daftar judul section, heading, atau kata kunci bagian di halaman aktif yang ingin disorot secara visual.',
                        ],
                        'reason' => [
                            'type' => 'string',
                            'description' => 'Penjelasan singkat bagian apa saja yang disorot dan mengapa relevan dengan pertanyaan pengguna.',
                        ],
                    ],
                    'required' => ['targets'],
                ],
            ],
        ];
    }
}
