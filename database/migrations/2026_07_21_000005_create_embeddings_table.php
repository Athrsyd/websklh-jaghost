<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Create embeddings table with a vector column and HNSW index.
     */
    public function up(): void
    {
        Schema::create('embeddings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('chunk_id')->unique();
            $table->string('model');
            $table->string('model_version');
            $table->unsignedInteger('dimensions')->default(768);
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('chunk_id')->references('id')->on('chunks')->onDelete('cascade');
        });

        // Add vector column
        DB::statement('ALTER TABLE embeddings ADD COLUMN embedding vector(384)');

        // Add HNSW index
        DB::statement('CREATE INDEX idx_embeddings_vector ON embeddings USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 200)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('embeddings');
    }
};
