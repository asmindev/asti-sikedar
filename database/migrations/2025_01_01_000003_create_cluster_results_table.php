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
        Schema::create('cluster_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->tinyInteger('cluster')->comment('Cluster number (0, 1, or 2)');
            $table->enum('label', ['C1', 'C2', 'C3'])->comment('Cluster label: C1 (High), C2 (Medium), C3 (Low)');
            $table->decimal('score_k', 8, 4)->comment('Knowledge score (scale 1-7, average of 7 questions)');
            $table->decimal('score_a', 8, 4)->comment('Attitude score (scale 1-7, average of 7 questions)');
            $table->decimal('score_b', 8, 4)->comment('Behavior score (scale 1-7, average of 7 questions)');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cluster_results');
    }
};
