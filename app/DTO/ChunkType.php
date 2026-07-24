<?php

declare(strict_types=1);

namespace App\DTO;

/**
 * Enumeration of possible chunk types extracted from documents.
 */
enum ChunkType: string
{
    case HEADING = 'heading';
    case PARAGRAPH = 'paragraph';
    case TABLE = 'table';
    case LIST_ITEM = 'list';
    case MIXED = 'mixed';
}
