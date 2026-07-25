<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Create the document_versions table for tracking document extraction variations over time.
     */
    public function up(): void
    {
        Schema::create('document_versions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('document_id');
            $table->unsignedInteger('version_number')->default(1);
            $table->string('content_hash', 64);
            $table->string('extraction_method')->default('pymupdf');
            $table->float('extraction_confidence')->default(0.0);
            $table->unsignedInteger('total_pages')->default(0);
            $table->unsignedInteger('total_chunks')->default(0);
            $table->string('status')->default('pending');
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();

            $table->foreign('document_id')->references('id')->on('documents')->onDelete('cascade');
            $table->unique(['document_id', 'version_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_versions');
    }
};
