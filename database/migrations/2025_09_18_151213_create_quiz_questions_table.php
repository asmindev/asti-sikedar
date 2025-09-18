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
        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->id();
            $table->string('aspect'); // knowledge, attitude, behavior
            $table->text('question'); // The question text
            $table->integer('order'); // Order within the aspect
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Index for faster queries
            $table->index(['aspect', 'order']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_questions');
    }
};
