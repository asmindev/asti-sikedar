<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\User;
use App\Models\Questionnaire;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class UserEmployeeSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@kejati.go.id',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'employee_id' => null
        ]);

        // Create Indonesian employees with corresponding users
        $employees = [
            [
                'employee_code' => 'EMP001',
                'name' => 'Budi Santoso',
                'department' => 'Teknologi Informasi',
                'position' => 'Software Engineer',
                'hire_date' => '2023-01-15',
                'phone' => '+62 812 3456 7890',
                'address' => 'Jl. Sudirman No. 123, Jakarta Pusat',
                'email' => 'user@kejati.go.id',
            ]
        ];


        foreach ($employees as $empData) {
            // Extract email for user creation
            $email = $empData['email'];
            unset($empData['email']);

            // Create employee
            $employee = Employee::create($empData);

            // Create user linked to the employee
            User::create([
                'name' => $empData['name'],
                'email' => $email,
                'password' => Hash::make('user123'),
                'role' => 'user',
                'employee_id' => $employee->id
            ]);
        }
    }
}
