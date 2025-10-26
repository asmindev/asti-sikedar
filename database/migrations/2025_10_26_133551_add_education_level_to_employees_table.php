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
        Schema::table('employees', function (Blueprint $table) {
            $table->enum('education_level', [
                'Tidak Tamat SD/Sederajat',
                'SD/Sederajat',
                'SMP/Sederajat',
                'SMA/Sederajat',
                'SMK/Sederajat',
                'Diploma I (D1)',
                'Diploma II (D2)',
                'Diploma III (D3)',
                'Sarjana (S1)',
                'Magister (S2)',
                'Doktor (S3)'
            ])->nullable()->after('gender')->comment('Tingkat Pendidikan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn('education_level');
        });
    }
};
