<?php

use App\Http\Controllers\Admin\ClusterController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\QuestionnaireImportController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\User\UserProfileController;
use App\Http\Controllers\User\UserResultController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Common dashboard route - will redirect based on user role
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// Admin Panel Routes
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Employee Management
    Route::resource('employees', EmployeeController::class);

    // Questionnaire Import
    Route::get('/questionnaires/upload', [QuestionnaireImportController::class, 'index'])->name('questionnaires.upload');
    Route::post('/questionnaires/upload', [QuestionnaireImportController::class, 'upload'])->name('questionnaires.store');

    // Cluster Analysis
    Route::get('/clusters/analysis', [ClusterController::class, 'analysis'])->name('clusters.analysis');
    Route::post('/clusters/run', [ClusterController::class, 'run'])->name('clusters.run');
    Route::get('/clusters/export-pdf', [ClusterController::class, 'exportPdf'])->name('clusters.export-pdf');
});

// User Panel Routes
Route::middleware(['auth', 'verified', 'role:user'])->prefix('user')->name('user.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile Management
    Route::get('/profile', [UserProfileController::class, 'index'])->name('profile');
    Route::put('/profile', [UserProfileController::class, 'update'])->name('profile.update');

    // View Results
    Route::get('/results', [UserResultController::class, 'index'])->name('results');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
