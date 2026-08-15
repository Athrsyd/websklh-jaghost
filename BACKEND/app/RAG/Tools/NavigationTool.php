<?php

declare(strict_types=1);

namespace App\RAG\Tools;

class NavigationTool
{
    /**
     * Get the OpenAI/Gemini compatible tool definition for page navigation.
     *
     * @return array<string, mixed>
     */
    public static function getDefinition(): array
    {
        $pagesConfig = config('navigation.pages', []);
        $pageKeys = array_keys($pagesConfig);

        return [
            'type' => 'function',
            'function' => [
                'name' => 'navigate_to_page',
                'description' => 'HANYA gunakan tool ini jika pengguna SECARA EKSPLISIT meminta untuk MEMBUKA atau DIARAHKAN ke halaman web tertentu. Kata kunci pemicu: "buka halaman", "ke halaman", "tampilkan halaman", "arahkan ke", "pergi ke". JANGAN gunakan tool ini jika pengguna hanya bertanya informasi/fakta (contoh: "apa sejarah sekolah ini", "siapa kepala sekolah", "jurusan apa saja"). Pertanyaan informasi harus dijawab langsung tanpa navigasi.',
                'parameters' => [
                    'type' => 'object',
                    'properties' => [
                        'page' => [
                            'type' => 'string',
                            'description' => 'Identifier halaman tujuan web SMKN 26 Jakarta. Pilihan: ' . implode(', ', $pageKeys),
                            'enum' => $pageKeys,
                        ],
                        'section' => [
                            'type' => 'string',
                            'description' => 'ID section atau bagian spesifik di halaman tersebut jika ada (opsional).',
                        ],
                        'reason' => [
                            'type' => 'string',
                            'description' => 'Penjelasan singkat mengapa halaman ini dipilih untuk memenuhi permintaan pengguna.',
                        ],
                    ],
                    'required' => ['page'],
                ],
            ],
        ];
    }

    /**
     * Resolve navigation details from page key, alias, or path.
     *
     * @param string $page
     * @param string|null $section
     * @return array<string, mixed>
     */
    public static function resolve(string $page, ?string $section = null): array
    {
        $pagesConfig = config('navigation.pages', []);
        $cleaned = strtolower(trim($page, " /\t\n\r\0\x0B"));

        // 1. Direct key match
        if (isset($pagesConfig[$cleaned])) {
            $data = $pagesConfig[$cleaned];
            return self::formatResult($cleaned, $data, $section);
        }

        // 2. Search by path or aliases
        foreach ($pagesConfig as $key => $data) {
            $pathClean = strtolower(trim($data['path'] ?? '', " /"));
            if ($cleaned === $pathClean) {
                return self::formatResult($key, $data, $section);
            }

            if (!empty($data['aliases']) && in_array($cleaned, $data['aliases'], true)) {
                return self::formatResult($key, $data, $section);
            }
        }

        // 3. Fallback: return formatted path
        $formattedPath = '/' . ltrim($page, '/');
        return [
            'valid' => true,
            'page' => $cleaned,
            'title' => ucwords(str_replace(['-', '_'], ' ', $cleaned)),
            'path' => $formattedPath,
            'section' => $section,
            'section_title' => null,
            'full_url' => $formattedPath . ($section ? '#' . $section : ''),
        ];
    }

    /**
     * Format the resolved navigation result.
     *
     * @param string $key
     * @param array<string, mixed> $data
     * @param string|null $section
     * @return array<string, mixed>
     */
    private static function formatResult(string $key, array $data, ?string $section = null): array
    {
        $path = $data['path'];
        $sectionName = null;

        if ($section && isset($data['sections'][$section])) {
            $sectionName = $data['sections'][$section];
        }

        return [
            'valid' => true,
            'page' => $key,
            'title' => $data['title'] ?? ucwords(str_replace(['-', '_'], ' ', $key)),
            'path' => $path,
            'section' => $section,
            'section_title' => $sectionName,
            'full_url' => $path . ($section ? '#' . $section : ''),
        ];
    }
}
