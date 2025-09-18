<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('likert_options', function (Blueprint $table) {
            $table->id();
            $table->integer('value'); // 1, 2, 3, 4, 5
            $table->string('label'); // STS, TS, CS, S, SS
            $table->string('description'); // Sangat Tidak Setuju, etc.
            $table->integer('order'); // Display order
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Index for faster queries
            $table->index('order');
            $table->index('is_active');
            $table->unique('value'); // Each value should be unique
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('likert_options');
    }
};
