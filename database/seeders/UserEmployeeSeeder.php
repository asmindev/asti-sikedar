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
                'email' => 'budi.santoso@kejati.go.id'
            ],
            [
                'employee_code' => 'EMP002',
                'name' => 'Sari Dewi',
                'department' => 'Sumber Daya Manusia',
                'position' => 'HR Manager',
                'hire_date' => '2022-03-20',
                'phone' => '+62 821 9876 5432',
                'address' => 'Jl. Thamrin No. 456, Jakarta Pusat',
                'email' => 'sari.dewi@kejati.go.id'
            ],
            [
                'employee_code' => 'EMP003',
                'name' => 'Ahmad Hidayat',
                'department' => 'Keuangan',
                'position' => 'Financial Analyst',
                'hire_date' => '2023-06-10',
                'phone' => '+62 813 1122 3344',
                'address' => 'Jl. Gatot Subroto No. 789, Jakarta Selatan',
                'email' => 'ahmad.hidayat@kejati.go.id'
            ],
            [
                'employee_code' => 'EMP004',
                'name' => 'Rina Kartika',
                'department' => 'Pemasaran',
                'position' => 'Marketing Specialist',
                'hire_date' => '2022-11-05',
                'phone' => '+62 822 5566 7788',
                'address' => 'Jl. Kuningan No. 101, Jakarta Selatan',
                'email' => 'rina.kartika@kejati.go.id'
            ],
            [
                'employee_code' => 'EMP005',
                'name' => 'Dedi Prasetyo',
                'department' => 'Operasional',
                'position' => 'Operations Manager',
                'hire_date' => '2021-09-12',
                'phone' => '+62 815 9988 7766',
                'address' => 'Jl. Kemang No. 202, Jakarta Selatan',
                'email' => 'dedi.prasetyo@kejati.go.id'
            ],
            [
                'employee_code' => 'EMP006',
                'name' => 'Fitri Rahayu',
                'department' => 'Hukum',
                'position' => 'Legal Counsel',
                'hire_date' => '2022-07-18',
                'phone' => '+62 814 3344 5566',
                'address' => 'Jl. Senayan No. 303, Jakarta Pusat',
                'email' => 'fitri.rahayu@kejati.go.id'
            ],
            [
                'employee_code' => 'EMP007',
                'name' => 'Andi Wijaya',
                'department' => 'Teknologi Informasi',
                'position' => 'System Administrator',
                'hire_date' => '2023-02-28',
                'phone' => '+62 823 7788 9900',
                'address' => 'Jl. Menteng No. 404, Jakarta Pusat',
                'email' => 'andi.wijaya@kejati.go.id'
            ],
            [
                'employee_code' => 'EMP008',
                'name' => 'Maya Sari',
                'department' => 'Keuangan',
                'position' => 'Accountant',
                'hire_date' => '2023-04-15',
                'phone' => '+62 811 2233 4455',
                'address' => 'Jl. Blok M No. 505, Jakarta Selatan',
                'email' => 'maya.sari@kejati.go.id'
            ],
            [
                'employee_code' => 'EMP009',
                'name' => 'Rudi Hartono',
                'department' => 'Administrasi',
                'position' => 'Administrative Staff',
                'hire_date' => '2023-08-01',
                'phone' => '+62 812 6677 8899',
                'address' => 'Jl. Cikini No. 606, Jakarta Pusat',
                'email' => 'rudi.hartono@kejati.go.id'
            ],
            [
                'employee_code' => 'EMP010',
                'name' => 'Indah Permata',
                'department' => 'Penelitian dan Pengembangan',
                'position' => 'Research Analyst',
                'hire_date' => '2023-05-20',
                'phone' => '+62 813 4455 6677',
                'address' => 'Jl. Mampang No. 707, Jakarta Selatan',
                'email' => 'indah.permata@kejati.go.id'
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
                'password' => Hash::make('password123'),
                'role' => 'user',
                'employee_id' => $employee->id
            ]);

            // Create questionnaire responses if Questionnaire model exists
            if (class_exists(Questionnaire::class) && Schema::hasTable('questionnaires')) {
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
