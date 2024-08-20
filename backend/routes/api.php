<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('web');

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login'])
    ->name('auth.login')->middleware('web');

Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register'])
    ->name('auth.register')->middleware('web');

Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])
    ->name('auth.logout')->middleware(['web','auth:sanctum']);

Route::post('/contact/store', [\App\Http\Controllers\ContactController::class, 'store'])
    ->name('contact.store')->middleware(['web','auth:sanctum']);

Route::get('/contact/index', [\App\Http\Controllers\ContactController::class, 'index'])
    ->name('contact.index')->middleware(['web','auth:sanctum']);

Route::get('/contact/show/{id}', [\App\Http\Controllers\ContactController::class, 'show'])
    ->name('contact.show')->middleware(['web','auth:sanctum']);
