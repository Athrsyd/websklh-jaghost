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
     * Create the chunks table for storing extracted text segments, including FTS vectors.
     */
    public function up(): void
    {
        Schema::create('chunks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('document_version_id');
            $table->uuid('parent_chunk_id')->nullable();
            $table->unsignedInteger('chunk_index');
            $table->string('chunk_type')->default('paragraph');
            $table->text('original_text');
            $table->text('contextual_header')->nullable();
            $table->string('heading')->nullable();
            $table->string('section')->nullable();
            $table->text('breadcrumb')->nullable();
            $table->unsignedInteger('page_start');
            $table->unsignedInteger('page_end');
            $table->string('language', 10)->default('id');
            $table->string('content_hash', 64)->index();
            $table->unsignedInteger('token_count')->default(0);
            $table->boolean('is_parent')->default(false)->index();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->foreign('document_version_id')->references('id')->on('document_versions')->onDelete('cascade');
            $table->index(['document_version_id', 'chunk_type']);
        });

        Schema::table('chunks', function (Blueprint $table) {
            $table->foreign('parent_chunk_id')->references('id')->on('chunks')->onDelete('set null');
        });

        // Partial index on parent_chunk_id
        DB::statement('CREATE INDEX chunks_parent_chunk_id_idx ON chunks (parent_chunk_id) WHERE parent_chunk_id IS NOT NULL');

        // Add tsvector column and GIN index for full text search
        DB::statement('ALTER TABLE chunks ADD COLUMN search_vector tsvector');
        DB::statement('CREATE INDEX idx_chunks_search_vector ON chunks USING GIN (search_vector)');

        // Create trigger to auto-update search_vector
        DB::statement("
            CREATE OR REPLACE FUNCTION chunks_search_vector_update() RETURNS trigger AS $$
            BEGIN
              NEW.search_vector := to_tsvector('simple', COALESCE(NEW.original_text, ''));
              RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        ");

        DB::statement("
            CREATE TRIGGER chunks_search_vector_trigger
            BEFORE INSERT OR UPDATE ON chunks
            FOR EACH ROW EXECUTE FUNCTION chunks_search_vector_update();
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS chunks_search_vector_trigger ON chunks");
        DB::statement("DROP FUNCTION IF EXISTS chunks_search_vector_update");
        Schema::dropIfExists('chunks');
    }
};
