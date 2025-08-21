<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Questionnaire;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        // Create sample employees
        $employees = [
            [
                'nip' => 'EMP001',
                'name' => 'John Doe',
                'age' => 28,
                'education' => 'Bachelor\'s Degree',
                'position' => 'Software Engineer',
                'gender' => 'male',
            ],
            [
                'nip' => 'EMP002',
                'name' => 'Jane Smith',
                'age' => 32,
                'education' => 'Master\'s Degree',
                'position' => 'Product Manager',
                'gender' => 'female',
            ],
            [
                'nip' => 'EMP003',
                'name' => 'Bob Wilson',
                'age' => 25,
                'education' => 'Bachelor\'s Degree',
                'position' => 'Data Analyst',
                'gender' => 'male',
            ],
            [
                'nip' => 'EMP004',
                'name' => 'Alice Johnson',
                'age' => 29,
                'education' => 'Bachelor\'s Degree',
                'position' => 'Designer',
                'gender' => 'female',
            ],
            [
                'nip' => 'EMP005',
                'name' => 'Charlie Brown',
                'age' => 35,
                'education' => 'Master\'s Degree',
                'position' => 'Marketing Manager',
                'gender' => 'male',
            ],
        ];

        foreach ($employees as $employeeData) {
            $employee = Employee::create($employeeData);

            // Create sample questionnaire responses
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
        }
    }
}
