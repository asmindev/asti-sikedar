<?php

namespace Database\Seeders;

use App\Models\LikertOption;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikertOptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $options = [
            ['value' => 5, 'label' => 'SS', 'description' => 'Sangat Setuju', 'order' => 1],
            ['value' => 4, 'label' => 'S', 'description' => 'Setuju', 'order' => 2],
            ['value' => 3, 'label' => 'CS', 'description' => 'Cukup Setuju', 'order' => 3],
            ['value' => 2, 'label' => 'TS', 'description' => 'Tidak Setuju', 'order' => 4],
            ['value' => 1, 'label' => 'STS', 'description' => 'Sangat Tidak Setuju', 'order' => 5],
        ];

        foreach ($options as $option) {
            LikertOption::create([
                'value' => $option['value'],
                'label' => $option['label'],
                'description' => $option['description'],
                'order' => $option['order'],
                'is_active' => true
            ]);
        }
    }
}
