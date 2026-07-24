<?php

declare(strict_types=1);

namespace App\Repositories;

use App\DTO\DocumentData;
use App\DTO\DocumentStatus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Class DocumentRepository
 * 
 * Repository for documents and versions.
 */
class DocumentRepository
{
    public function findById(string $id): ?DocumentData
    {
        $row = DB::table('documents')->where('id', $id)->first();
        if (!$row) {
            return null;
        }

        return new DocumentData(
            id: $row->id,
            name: $row->name,
            sourceFile: $row->source_file,
            contentHash: $row->content_hash,
            status: DocumentStatus::from($row->status),
            metadata: json_decode($row->metadata ?? '{}', true)
        );
    }

    public function findByContentHash(string $hash): ?DocumentData
    {
        $row = DB::table('documents')->where('content_hash', $hash)->first();
        if (!$row) {
            return null;
        }

        return new DocumentData(
            id: $row->id,
            name: $row->name,
            sourceFile: $row->source_file,
            contentHash: $row->content_hash,
            status: DocumentStatus::from($row->status),
            metadata: json_decode($row->metadata ?? '{}', true)
        );
    }

    public function create(DocumentData $data): DocumentData
    {
        DB::table('documents')->insert([
            'id' => $data->id,
            'name' => $data->name,
            'source_file' => $data->sourceFile,
            'content_hash' => $data->contentHash,
            'status' => $data->status->value,
            'metadata' => json_encode($data->metadata),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $data;
    }

    public function updateStatus(string $id, DocumentStatus|string $status): void
    {
        $statusStr = $status instanceof DocumentStatus ? $status->value : $status;
        DB::table('documents')->where('id', $id)->update([
            'status' => $statusStr,
            'updated_at' => now(),
        ]);
    }

    public function createVersion(string $documentId, array $attributes): string
    {
        $versionId = $attributes['id'] ?? Str::uuid()->toString();

        $maxVersion = DB::table('document_versions')
            ->where('document_id', $documentId)
            ->max('version_number') ?? 0;

        DB::table('document_versions')->insert([
            'id' => $versionId,
            'document_id' => $documentId,
            'version_number' => $maxVersion + 1,
            'content_hash' => $attributes['content_hash'] ?? md5($documentId . time()),
            'extraction_method' => $attributes['extraction_method'] ?? 'pymupdf',
            'extraction_confidence' => $attributes['extraction_confidence'] ?? 0.95,
            'total_pages' => $attributes['total_pages'] ?? 0,
            'total_chunks' => $attributes['total_chunks'] ?? 0,
            'status' => $attributes['status'] ?? 'pending',
            'processed_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $versionId;
    }

    public function updateVersionStatus(string $versionId, DocumentStatus|string $status, array $additional = []): void
    {
        $statusStr = $status instanceof DocumentStatus ? $status->value : $status;
        $data = array_merge(['status' => $statusStr, 'updated_at' => now()], $additional);
        
        DB::table('document_versions')->where('id', $versionId)->update($data);
    }

    public function getLatestVersionId(?string $documentId = null): ?string
    {
        $query = DB::table('document_versions')->where('status', 'completed');
        if ($documentId) {
            $query->where('document_id', $documentId);
        }

        $row = $query->orderBy('created_at', 'desc')->first();
        return $row?->id;
    }
}
