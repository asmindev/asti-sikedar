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
        Schema::table('cluster_results', function (Blueprint $table) {
            $table->decimal('distance_to_low', 8, 4)->nullable()->after('score_b')->comment('Distance to Low cluster centroid');
            $table->decimal('distance_to_medium', 8, 4)->nullable()->after('distance_to_low')->comment('Distance to Medium cluster centroid');
            $table->decimal('distance_to_high', 8, 4)->nullable()->after('distance_to_medium')->comment('Distance to High cluster centroid');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cluster_results', function (Blueprint $table) {
            $table->dropColumn(['distance_to_low', 'distance_to_medium', 'distance_to_high']);
        });
    }
};
