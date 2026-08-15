<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('api-docs');
});

Route::get('/api/docs', function () {
    return view('api-docs');
})->name('api.docs');

Route::get('/docs', function () {
    return view('api-docs');
});
