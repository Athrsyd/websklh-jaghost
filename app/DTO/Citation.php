<?php
declare(strict_types=1);

namespace App\DTO;

readonly class Citation
{
    public function __construct(
        public int $index,
        public string $text,
        public int $page,
        public ?string $section,
        public string $chunkId
    ) {}
}