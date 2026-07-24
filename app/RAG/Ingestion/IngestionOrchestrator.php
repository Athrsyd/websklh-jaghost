<?php

declare(strict_types=1);

namespace App\RAG\Ingestion;

use App\RAG\Chunking\SemanticChunker;
use App\RAG\Chunking\ParentChildMapper;
use App\RAG\Chunking\ChunkSizeGuard;
use App\RAG\Embedding\ContextualHeaderGenerator;
use App\RAG\Embedding\EmbeddingService;
use App\Repositories\DocumentRepository;
use App\Repositories\ChunkRepository;
use App\Repositories\EmbeddingRepository;
use App\DTO\DocumentData;
use App\DTO\DocumentStatus;
use App\DTO\IngestionProgress;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * Class IngestionOrchestrator
 * 
 * Orchestrates the full ingestion pipeline.
 */
readonly class IngestionOrchestrator
{
    public function __construct(
        private PdfExtractor $extractor,
        private TextNormalizer $normalizer,
        private StructuralAnalyzer $analyzer,
        private SemanticChunker $chunker,
        private ParentChildMapper $mapper,
        private ChunkSizeGuard $guard,
        private ContextualHeaderGenerator $headerGenerator,
        private EmbeddingService $embeddingService,
        private DocumentRepository $documentRepo,
        private ChunkRepository $chunkRepo,
        private EmbeddingRepository $embeddingRepo
    ) {
    }

    /**
     * Ingests a PDF file into the RAG system.
     */
    public function ingest(string $filePath, string $documentId): IngestionProgress
    {
        $traceId = Str::uuid()->toString();
        $startTime = microtime(true);
        $absolutePath = base_path($filePath);

        Log::channel('rag')->info('Started ingestion pipeline', [
            'trace_id' => $traceId,
            'document_id' => $documentId,
            'file_path' => $filePath,
        ]);

        DB::beginTransaction();
        try {
            // 1. Create or fetch Document
            $contentHash = hash_file('sha256', $absolutePath);
            $fileName = basename($filePath);

            $doc = $this->documentRepo->findById($documentId);
            if (!$doc) {
                $doc = new DocumentData(
                    id: $documentId,
                    name: $fileName,
                    sourceFile: $filePath,
                    contentHash: $contentHash,
                    status: DocumentStatus::PROCESSING,
                    metadata: ['trace_id' => $traceId]
                );
                $this->documentRepo->create($doc);
            } else {
                $this->documentRepo->updateStatus($documentId, DocumentStatus::PROCESSING);
            }

            // 2. Extract PDF
            $parsedDoc = $this->extractor->extract($absolutePath);

            // 3. Analyze Structure
            $structure = $this->analyzer->analyze($parsedDoc);

            // 4. Semantic Chunking
            $rawChunks = $this->chunker->chunk($structure);

            // 5. Parent-Child Mapping
            $versionId = Str::uuid()->toString();
            $mappedChunks = $this->mapper->map($rawChunks);

            // 6. Size Guard
            $finalChunks = $this->guard->guard($mappedChunks);

            // Attach documentVersionId to all chunks
            $finalChunks = array_map(function ($chunk) use ($versionId) {
                return new \App\DTO\ChunkData(
                    id: $chunk->id,
                    documentVersionId: $versionId,
                    parentChunkId: $chunk->parentChunkId,
                    chunkIndex: $chunk->chunkIndex,
                    chunkType: $chunk->chunkType,
                    originalText: $chunk->originalText,
                    contextualHeader: $chunk->contextualHeader,
                    heading: $chunk->heading,
                    section: $chunk->section,
                    breadcrumb: $chunk->breadcrumb,
                    pageStart: $chunk->pageStart,
                    pageEnd: $chunk->pageEnd,
                    language: $chunk->language,
                    contentHash: $chunk->contentHash,
                    tokenCount: $chunk->tokenCount,
                    isParent: $chunk->isParent,
                    metadata: $chunk->metadata
                );
            }, $finalChunks);

            // 7. Create Document Version in DB
            $this->documentRepo->createVersion($documentId, [
                'id' => $versionId,
                'content_hash' => $contentHash,
                'extraction_method' => $parsedDoc->extractionMethod,
                'extraction_confidence' => $parsedDoc->extractionConfidence,
                'total_pages' => $parsedDoc->totalPages,
                'total_chunks' => count($finalChunks),
                'status' => 'processing',
            ]);

            // 8. Save Chunks to DB
            $this->chunkRepo->createBatch($finalChunks);

            // 9. Generate and Save Embeddings (for non-parent child chunks)
            $childChunks = array_values(array_filter($finalChunks, fn($c) => !$c->isParent));
            $embeddings = $this->embeddingService->embedChunks($childChunks);

            $embeddingRecords = [];
            foreach ($childChunks as $idx => $child) {
                $embeddingRecords[] = [
                    'chunk_id' => $child->id,
                    'embedding' => $embeddings[$idx],
                    'model' => $this->embeddingService->model(),
                    'model_version' => $this->embeddingService->version(),
                    'dimensions' => $this->embeddingService->dimensions(),
                ];
            }

            $this->embeddingRepo->createBatch($embeddingRecords);

            // 10. Update Document & Version Status to Completed
            $this->documentRepo->updateStatus($documentId, DocumentStatus::COMPLETED);
            $this->documentRepo->updateVersionStatus($versionId, DocumentStatus::COMPLETED);

            DB::commit();

            $durationMs = (microtime(true) - $startTime) * 1000;
            $parentCount = count(array_filter($finalChunks, fn($c) => $c->isParent));
            $childCount = count($childChunks);

            Log::channel('rag')->info('Ingestion pipeline completed successfully', [
                'trace_id' => $traceId,
                'document_id' => $documentId,
                'version_id' => $versionId,
                'total_chunks' => count($finalChunks),
                'duration_ms' => $durationMs,
            ]);

            return new IngestionProgress(
                documentId: $documentId,
                documentVersionId: $versionId,
                status: 'completed',
                totalPages: $parsedDoc->totalPages,
                totalChunks: count($finalChunks),
                parentChunks: $parentCount,
                childChunks: $childCount,
                embeddingsGenerated: count($embeddingRecords),
                durationMs: $durationMs,
                error: null,
                metadata: ['trace_id' => $traceId]
            );
        } catch (\Throwable $e) {
            DB::rollBack();
            $this->documentRepo->updateStatus($documentId, DocumentStatus::FAILED);

            Log::channel('rag')->error('Ingestion pipeline failed', [
                'trace_id' => $traceId,
                'document_id' => $documentId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }
}
