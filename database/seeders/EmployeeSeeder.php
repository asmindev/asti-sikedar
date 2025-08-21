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
                'employee_code' => 'EMP001',
                'name' => 'John Doe',
                'department' => 'Information Technology',
                'position' => 'Software Engineer',
                'hire_date' => '2023-01-15',
                'phone' => '+62 812 3456 7890',
                'address' => 'Jl. Sudirman No. 123, Jakarta Pusat',
            ],
            [
                'employee_code' => 'EMP002',
                'name' => 'Jane Smith',
                'department' => 'Human Resources',
                'position' => 'HR Manager',
                'hire_date' => '2022-03-20',
                'phone' => '+62 821 9876 5432',
                'address' => 'Jl. Thamrin No. 456, Jakarta Pusat',
            ],
            [
                'employee_code' => 'EMP003',
                'name' => 'Bob Wilson',
                'department' => 'Finance',
                'position' => 'Financial Analyst',
                'hire_date' => '2023-06-10',
                'phone' => '+62 813 1122 3344',
                'address' => 'Jl. Gatot Subroto No. 789, Jakarta Selatan',
            ],
            [
                'employee_code' => 'EMP004',
                'name' => 'Alice Johnson',
                'department' => 'Marketing',
                'position' => 'Marketing Specialist',
                'hire_date' => '2022-11-05',
                'phone' => '+62 822 5566 7788',
                'address' => 'Jl. Kuningan No. 101, Jakarta Selatan',
            ],
            [
                'employee_code' => 'EMP005',
                'name' => 'Charlie Brown',
                'department' => 'Operations',
                'position' => 'Operations Manager',
                'hire_date' => '2021-09-12',
                'phone' => '+62 815 9988 7766',
                'address' => 'Jl. Kemang No. 202, Jakarta Selatan',
            ],
            [
                'employee_code' => 'EMP006',
                'name' => 'Diana Prince',
                'department' => 'Legal',
                'position' => 'Legal Counsel',
                'hire_date' => '2022-07-18',
                'phone' => '+62 814 3344 5566',
                'address' => 'Jl. Senayan No. 303, Jakarta Pusat',
            ],
            [
                'employee_code' => 'EMP007',
                'name' => 'Edward Clark',
                'department' => 'Information Technology',
                'position' => 'System Administrator',
                'hire_date' => '2023-02-28',
                'phone' => '+62 823 7788 9900',
                'address' => 'Jl. Menteng No. 404, Jakarta Pusat',
            ],
            [
                'employee_code' => 'EMP008',
                'name' => 'Fiona Lee',
                'department' => 'Finance',
                'position' => 'Accountant',
                'hire_date' => '2023-04-15',
                'phone' => '+62 811 2233 4455',
                'address' => 'Jl. Blok M No. 505, Jakarta Selatan',
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
