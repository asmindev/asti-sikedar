<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, modify the enum column to accept both old and new values temporarily
        DB::statement("ALTER TABLE cluster_results MODIFY COLUMN label ENUM('Low', 'Medium', 'High', 'C1', 'C2', 'C3') COMMENT 'Cluster label'");

        // Update existing data
        // Low -> C3, Medium -> C2, High -> C1
        DB::table('cluster_results')
            ->where('label', 'Low')
            ->update(['label' => 'C3']);

        DB::table('cluster_results')
            ->where('label', 'Medium')
            ->update(['label' => 'C2']);

        DB::table('cluster_results')
            ->where('label', 'High')
            ->update(['label' => 'C1']);

        // Finally, modify the enum column to only accept new values
        DB::statement("ALTER TABLE cluster_results MODIFY COLUMN label ENUM('C1', 'C2', 'C3') COMMENT 'Cluster label: C1 (High), C2 (Medium), C3 (Low)'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // First, modify the enum column to accept both old and new values temporarily
        DB::statement("ALTER TABLE cluster_results MODIFY COLUMN label ENUM('Low', 'Medium', 'High', 'C1', 'C2', 'C3') COMMENT 'Performance label'");

        // Revert data changes
        // C3 -> Low, C2 -> Medium, C1 -> High
        DB::table('cluster_results')
            ->where('label', 'C3')
            ->update(['label' => 'Low']);

        DB::table('cluster_results')
            ->where('label', 'C2')
            ->update(['label' => 'Medium']);

        DB::table('cluster_results')
            ->where('label', 'C1')
            ->update(['label' => 'High']);

        // Finally, revert the enum column to only accept old values
        DB::statement("ALTER TABLE cluster_results MODIFY COLUMN label ENUM('Low', 'Medium', 'High') COMMENT 'Performance label'");
    }
};
