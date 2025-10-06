<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Questionnaire;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        // Create sample employees with new structure
        $employees = [
            [
                'name' => 'John Doe',
                'position' => 'Software Engineer',
                'gender' => 'Laki-laki',
                'birth_date' => '1990-01-15'
            ],
            [
                'name' => 'Jane Smith',
                'position' => 'HR Manager',
                'gender' => 'Perempuan',
                'birth_date' => '1985-07-20'
            ],
            [
                'name' => 'Bob Wilson',
                'position' => 'Financial Analyst',
                'gender' => 'Laki-laki',
                'birth_date' => '1988-03-10'
            ],
            [
                'name' => 'Alice Johnson',
                'position' => 'Marketing Specialist',
                'gender' => 'Perempuan',
                'birth_date' => '1992-11-25'
            ],
            [
                'name' => 'Charlie Brown',
                'position' => 'Operations Manager',
                'gender' => 'Laki-laki',
                'birth_date' => '1979-05-30'
            ],
            [
                'name' => 'Diana Prince',
                'position' => 'Legal Counsel',
                'gender' => 'Perempuan',
                'birth_date' => '1983-12-12'
            ],
            [
                'name' => 'Edward Clark',
                'position' => 'System Administrator',
                'gender' => 'Laki-laki',
                'birth_date' => '1980-08-08'
            ],
            [
                'name' => 'Fiona Lee',
                'position' => 'Accountant',
                'gender' => 'Perempuan',
            ],
        ];

        foreach ($employees as $employeeData) {
            $employee = Employee::create($employeeData);

            // Create sample questionnaire responses if Questionnaire model exists
            if (class_exists(Questionnaire::class) && Schema::hasTable('questionnaires')) {
                // Only create questionnaire if table has the expected structure
                try {
                    Questionnaire::create([
                        'employee_id' => $employee->id,
                        'k1' => rand(3, 5),
                        'k2' => rand(3, 5),
                        'k3' => rand(3, 5),
                        'k4' => rand(3, 5),
                        'k5' => rand(3, 5),
                        'k6' => rand(3, 5),
                        'k7' => rand(3, 5),
                        'a1' => rand(2, 5),
                        'a2' => rand(2, 5),
                        'a3' => rand(2, 5),
                        'a4' => rand(2, 5),
                        'a5' => rand(2, 5),
                        'a6' => rand(2, 5),
                        'a7' => rand(2, 5),
                        'b1' => rand(2, 5),
                        'b2' => rand(2, 5),
                        'b3' => rand(2, 5),
                        'b4' => rand(2, 5),
                        'b5' => rand(2, 5),
                        'b6' => rand(2, 5),
                        'b7' => rand(2, 5),
                    ]);
                } catch (\Exception $e) {
                    // Skip questionnaire creation if there's an error
                    // This handles cases where questionnaire structure might be different
                }
            }
        }
    }
}
