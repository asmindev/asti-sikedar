<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user (without employee record)
        User::create([
            'name' => 'System Administrator',
            'email' => 'admin@kejati.go.id',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'employee_id' => null,
            'email_verified_at' => now(),
        ]);

        // Seed employee data first, then create some user accounts
        $this->call([
            EmployeeSeeder::class,
        ]);

        // Create some user accounts for existing employees
        $this->createEmployeeUserAccounts();
    }

    /**
     * Create user accounts for some employees
     */
    private function createEmployeeUserAccounts(): void
    {
        // Get some employees to create user accounts for
        $employees = \App\Models\Employee::whereIn('employee_code', ['EMP002', 'EMP004', 'EMP006'])->get();

        foreach ($employees as $employee) {
            if (!$employee->user) { // Only create if user doesn't already exist
                User::create([
                    'name' => $employee->name,
                    'email' => strtolower(str_replace(' ', '.', $employee->name)) . '@kejati.go.id',
                    'password' => Hash::make('password123'),
                    'role' => 'user',
                    'employee_id' => $employee->id,
                    'email_verified_at' => now(),
                ]);
            }
        }
    }
}
