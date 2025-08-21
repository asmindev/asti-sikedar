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
            $table->enum('label', ['Low', 'Medium', 'High'])->comment('Performance label');
            $table->decimal('score_k', 8, 4)->comment('K dimension score');
            $table->decimal('score_a', 8, 4)->comment('A dimension score');
            $table->decimal('score_b', 8, 4)->comment('B dimension score');
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
