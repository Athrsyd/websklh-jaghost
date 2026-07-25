<?php

declare(strict_types=1);

namespace App\DTO;

class RetrievalResult
{
    public ?float $denseScore = null;
    public ?float $sparseScore = null;
    public ?float $rrfScore = null;
    public ?float $rerankerScore = null;

    public function __construct(
        public readonly string $chunkId,
        public string $text,
        public readonly int $page,
        public readonly ?string $section
    ) {}
}