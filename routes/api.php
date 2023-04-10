<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get("/users",[UserController::class,"index"]);
    Route::get("/singleuser/{user}",[UserController::class,"show"]);
    Route::post("/createuser",[UserController::class,"store"]);
    Route::patch("/userupdate/{user}",[UserController::class,"update"]);
    Route::delete("/userdelete/{user}",[UserController::class,"destroy"]);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
