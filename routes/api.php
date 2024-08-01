<?php

use App\Http\Controllers\GeneralController;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\UserController;
use App\Models\Company;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);    
    Route::get('/auth/check', [AuthController::class, 'check']);

    // Consider image upload in post
    Route::post('/companies/{id}', [CompanyController::class, 'update']);
    Route::resource('companies', CompanyController::class);
    Route::resource('employees', EmployeeController::class);
    Route::post('/update-company-logo/{id}', [CompanyController::class, 'updateLogo']);
    Route::any('/st/auto/{item}', [GeneralController::class, 'auto']);
});
