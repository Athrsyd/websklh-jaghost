<?php

declare(strict_types=1);

namespace App\DTO;

/**
 * Enumeration of document processing statuses.
 */
enum DocumentStatus: string
{
    case PENDING = 'pending';
    case PROCESSING = 'processing';
    case COMPLETED = 'completed';
    case FAILED = 'failed';
}
