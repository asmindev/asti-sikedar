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
        Schema::create('questionnaires', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');

            // K dimension questions (1-5 scale)
            $table->tinyInteger('k1')->unsigned()->comment('K dimension question 1 (1-5)');
            $table->tinyInteger('k2')->unsigned()->comment('K dimension question 2 (1-5)');
            $table->tinyInteger('k3')->unsigned()->comment('K dimension question 3 (1-5)');
            $table->tinyInteger('k4')->unsigned()->comment('K dimension question 4 (1-5)');
            $table->tinyInteger('k5')->unsigned()->comment('K dimension question 5 (1-5)');
            $table->tinyInteger('k6')->unsigned()->comment('K dimension question 6 (1-5)');
            $table->tinyInteger('k7')->unsigned()->comment('K dimension question 7 (1-5)');

            // A dimension questions (1-5 scale)
            $table->tinyInteger('a1')->unsigned()->comment('A dimension question 1 (1-5)');
            $table->tinyInteger('a2')->unsigned()->comment('A dimension question 2 (1-5)');
            $table->tinyInteger('a3')->unsigned()->comment('A dimension question 3 (1-5)');
            $table->tinyInteger('a4')->unsigned()->comment('A dimension question 4 (1-5)');
            $table->tinyInteger('a5')->unsigned()->comment('A dimension question 5 (1-5)');
            $table->tinyInteger('a6')->unsigned()->comment('A dimension question 6 (1-5)');
            $table->tinyInteger('a7')->unsigned()->comment('A dimension question 7 (1-5)');

            // B dimension questions (1-5 scale)
            $table->tinyInteger('b1')->unsigned()->comment('B dimension question 1 (1-5)');
            $table->tinyInteger('b2')->unsigned()->comment('B dimension question 2 (1-5)');
            $table->tinyInteger('b3')->unsigned()->comment('B dimension question 3 (1-5)');
            $table->tinyInteger('b4')->unsigned()->comment('B dimension question 4 (1-5)');
            $table->tinyInteger('b5')->unsigned()->comment('B dimension question 5 (1-5)');
            $table->tinyInteger('b6')->unsigned()->comment('B dimension question 6 (1-5)');
            $table->tinyInteger('b7')->unsigned()->comment('B dimension question 7 (1-5)');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questionnaires');
    }
};
