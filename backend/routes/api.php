<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('web');

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login'])
    ->name('auth.login')->middleware('web');
