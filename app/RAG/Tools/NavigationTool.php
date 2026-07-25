<?php

declare(strict_types=1);

namespace App\RAG\Tools;

class NavigationTool
{
    /**
     * Get the OpenAI-compatible tool definition for page navigation.
     *
     * @return array<string, mixed>
     */
    public static function getDefinition(): array
    {
        $pagesConfig = config('navigation.pages', []);
        $pageNames = array_keys($pagesConfig);

        return [
            'type' => 'function',
            'function' => [
                'name' => 'navigate_to_page',
                'description' => 'Mengarahkan pengguna atau menentukan rute halaman dan section spesifik pada situs web SMKN 26 Jakarta ketika pengguna menanyakan lokasi halaman, lagu mars, jurusan, pendaftaran, atau kontak.',
                'parameters' => [
                    'type' => 'object',
                    'properties' => [
                        'page' => [
                            'type' => 'string',
                            'description' => 'Nama rute halaman web sekolah (pilihan valid: ' . implode(', ', $pageNames) . ').',
                            'enum' => $pageNames,
                        ],
                        'section' => [
                            'type' => 'string',
                            'description' => 'ID section atau bagian spesifik di dalam halaman tersebut (misal: mars-smkn26, visi-misi, syarat-pendaftaran, profil-sekolah).',
                        ],
                        'reason' => [
                            'type' => 'string',
                            'description' => 'Alasan penentuan rute navigasi ini untuk menjawab pertanyaan pengguna.',
                        ],
                    ],
                    'required' => ['page'],
                ],
            ],
        ];
    }

    /**
     * Resolve navigation details from page and section arguments.
     *
     * @param string $page
     * @param string|null $section
     * @return array<string, mixed>
     */
    public static function resolve(string $page, ?string $section = null): array
    {
        $pagesConfig = config('navigation.pages', []);
        $pageData = $pagesConfig[$page] ?? null;

        if (!$pageData) {
            return [
                'valid' => false,
                'page' => $page,
                'path' => '/' . ltrim($page, '/'),
                'section' => $section,
                'full_url' => '/' . ltrim($page, '/') . ($section ? '#' . $section : ''),
            ];
        }

        $path = $pageData['path'];
        $sectionName = null;

        if ($section && isset($pageData['sections'][$section])) {
            $sectionName = $pageData['sections'][$section];
        }

        return [
            'valid' => true,
            'page' => $page,
            'title' => $pageData['title'],
            'path' => $path,
            'section' => $section,
            'section_title' => $sectionName,
            'full_url' => $path . ($section ? '#' . $section : ''),
        ];
    }
}
