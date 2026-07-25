<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Create the retrieval_logs table for tracing and debugging RAG queries.
     */
    public function up(): void
    {
        Schema::create('retrieval_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('trace_id', 36)->index();
            $table->text('query');
            $table->json('retrieved_chunk_ids')->nullable();
            $table->json('dense_scores')->nullable();
            $table->json('sparse_scores')->nullable();
            $table->json('rrf_scores')->nullable();
            $table->json('reranker_scores')->nullable();
            $table->float('confidence_score')->default(0.0);
            $table->boolean('passed_gate')->default(false);
            $table->text('generated_answer')->nullable();
            $table->unsignedInteger('latency_ms')->default(0);
            $table->json('metadata')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('retrieval_logs');
    }
};
