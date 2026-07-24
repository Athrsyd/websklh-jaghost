<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ChatCompletionController;
use App\Http\Controllers\Api\DocumentController;

Route::prefix('v1')->group(function () {
    Route::post('/chat/completions', [ChatCompletionController::class, 'store']);
    Route::post('/documents/ingest', [DocumentController::class, 'ingest']);
    Route::get('/documents', [DocumentController::class, 'index']);
    Route::get('/documents/{id}/status', [DocumentController::class, 'status']);
    Route::delete('/documents/{id}', [DocumentController::class, 'destroy']);
});