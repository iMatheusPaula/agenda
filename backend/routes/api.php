<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login'])
    ->name('auth.login')->middleware('web');

Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register'])
    ->name('auth.register')->middleware('web');

Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])
    ->name('auth.logout')->middleware(['web','auth:sanctum']);

Route::group([
    'prefix' => 'contact',
    'middleware' => ['web','auth:sanctum']
], function () {
    Route::post('/store', [ContactController::class, 'store'])
        ->name('contact.store');

    Route::get('/index', [ContactController::class, 'index'])
        ->name('contact.index');

    Route::get('/show/{id}', [ContactController::class, 'show'])
        ->name('contact.show');

    Route::delete('/destroy/{id}', [ContactController::class, 'destroy'])
        ->name('contact.destroy');

    Route::post('/update/{id}', [ContactController::class, 'update'])
        ->name('contact.update');
});
