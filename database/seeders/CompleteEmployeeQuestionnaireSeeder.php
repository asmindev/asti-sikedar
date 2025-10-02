<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Questionnaire;
use Illuminate\Database\Seeder;

class CompleteEmployeeQuestionnaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data 10 karyawan dengan jawaban kuesioner yang bervariasi
        $employeesData = [
            [
                'employee' => [
                    'employee_code' => 'EMP101',
                    'name' => 'Andi Wijaya',
                    'department' => 'Teknologi Informasi',
                    'position' => 'Senior Software Engineer',
                    'gender' => 'Laki-laki',
                    'phone' => '+62 812 1111 1111',
                    'address' => 'Jl. Gatot Subroto No. 45, Jakarta Selatan',
                ],
                'questionnaire' => [
                    'k1' => 5, 'k2' => 5, 'k3' => 4, 'k4' => 5, 'k5' => 5, 'k6' => 4, 'k7' => 5,
                    'a1' => 5, 'a2' => 4, 'a3' => 5, 'a4' => 5, 'a5' => 4, 'a6' => 5, 'a7' => 5,
                    'b1' => 5, 'b2' => 5, 'b3' => 4, 'b4' => 5, 'b5' => 5, 'b6' => 4, 'b7' => 5,
                ]
            ],
            [
                'employee' => [
                    'employee_code' => 'EMP102',
                    'name' => 'Siti Nurhaliza',
                    'department' => 'Sumber Daya Manusia',
                    'position' => 'HR Manager',
                    'gender' => 'Perempuan',
                    'phone' => '+62 812 2222 2222',
                    'address' => 'Jl. Sudirman No. 88, Jakarta Pusat',
                ],
                'questionnaire' => [
                    'k1' => 4, 'k2' => 5, 'k3' => 4, 'k4' => 4, 'k5' => 5, 'k6' => 4, 'k7' => 4,
                    'a1' => 4, 'a2' => 4, 'a3' => 5, 'a4' => 4, 'a5' => 4, 'a6' => 5, 'a7' => 4,
                    'b1' => 4, 'b2' => 4, 'b3' => 5, 'b4' => 4, 'b5' => 4, 'b6' => 4, 'b7' => 5,
                ]
            ],
            [
                'employee' => [
                    'employee_code' => 'EMP103',
                    'name' => 'Budi Santoso',
                    'department' => 'Keuangan',
                    'position' => 'Financial Analyst',
                    'gender' => 'Laki-laki',
                    'phone' => '+62 812 3333 3333',
                    'address' => 'Jl. Thamrin No. 12, Jakarta Pusat',
                ],
                'questionnaire' => [
                    'k1' => 3, 'k2' => 3, 'k3' => 4, 'k4' => 3, 'k5' => 3, 'k6' => 3, 'k7' => 4,
                    'a1' => 3, 'a2' => 3, 'a3' => 4, 'a4' => 3, 'a5' => 3, 'a6' => 4, 'a7' => 3,
                    'b1' => 3, 'b2' => 3, 'b3' => 3, 'b4' => 4, 'b5' => 3, 'b6' => 3, 'b7' => 4,
                ]
            ],
            [
                'employee' => [
                    'employee_code' => 'EMP104',
                    'name' => 'Dewi Lestari',
                    'department' => 'Pemasaran',
                    'position' => 'Marketing Specialist',
                    'gender' => 'Perempuan',
                    'phone' => '+62 812 4444 4444',
                    'address' => 'Jl. Kuningan No. 77, Jakarta Selatan',
                ],
                'questionnaire' => [
                    'k1' => 5, 'k2' => 4, 'k3' => 5, 'k4' => 5, 'k5' => 4, 'k6' => 5, 'k7' => 5,
                    'a1' => 5, 'a2' => 5, 'a3' => 4, 'a4' => 5, 'a5' => 5, 'a6' => 4, 'a7' => 5,
                    'b1' => 4, 'b2' => 5, 'b3' => 5, 'b4' => 5, 'b5' => 4, 'b6' => 5, 'b7' => 5,
                ]
            ],
            [
                'employee' => [
                    'employee_code' => 'EMP105',
                    'name' => 'Rudi Hartono',
                    'department' => 'Operasional',
                    'position' => 'Operations Manager',
                    'gender' => 'Laki-laki',
                    'phone' => '+62 812 5555 5555',
                    'address' => 'Jl. Kemang No. 22, Jakarta Selatan',
                ],
                'questionnaire' => [
                    'k1' => 2, 'k2' => 3, 'k3' => 2, 'k4' => 3, 'k5' => 2, 'k6' => 3, 'k7' => 2,
                    'a1' => 2, 'a2' => 3, 'a3' => 2, 'a4' => 3, 'a5' => 2, 'a6' => 3, 'a7' => 2,
                    'b1' => 3, 'b2' => 2, 'b3' => 3, 'b4' => 2, 'b5' => 3, 'b6' => 2, 'b7' => 3,
                ]
            ],
            [
                'employee' => [
                    'employee_code' => 'EMP106',
                    'name' => 'Linda Kusuma',
                    'department' => 'Hukum',
                    'position' => 'Legal Counsel',
                    'gender' => 'Perempuan',
                    'phone' => '+62 812 6666 6666',
                    'address' => 'Jl. Senayan No. 99, Jakarta Pusat',
                ],
                'questionnaire' => [
                    'k1' => 4, 'k2' => 4, 'k3' => 5, 'k4' => 4, 'k5' => 4, 'k6' => 4, 'k7' => 5,
                    'a1' => 4, 'a2' => 5, 'a3' => 4, 'a4' => 4, 'a5' => 5, 'a6' => 4, 'a7' => 4,
                    'b1' => 5, 'b2' => 4, 'b3' => 4, 'b4' => 5, 'b5' => 4, 'b6' => 4, 'b7' => 5,
                ]
            ],
            [
                'employee' => [
                    'employee_code' => 'EMP107',
                    'name' => 'Ahmad Fauzi',
                    'department' => 'Teknologi Informasi',
                    'position' => 'System Administrator',
                    'gender' => 'Laki-laki',
                    'phone' => '+62 812 7777 7777',
                    'address' => 'Jl. Menteng No. 33, Jakarta Pusat',
                ],
                'questionnaire' => [
                    'k1' => 3, 'k2' => 4, 'k3' => 3, 'k4' => 3, 'k5' => 4, 'k6' => 3, 'k7' => 4,
                    'a1' => 3, 'a2' => 3, 'a3' => 4, 'a4' => 3, 'a5' => 4, 'a6' => 3, 'a7' => 3,
                    'b1' => 4, 'b2' => 3, 'b3' => 3, 'b4' => 4, 'b5' => 3, 'b6' => 3, 'b7' => 4,
                ]
            ],
            [
                'employee' => [
                    'employee_code' => 'EMP108',
                    'name' => 'Maya Sari',
                    'department' => 'Keuangan',
                    'position' => 'Accountant',
                    'gender' => 'Perempuan',
                    'phone' => '+62 812 8888 8888',
                    'address' => 'Jl. Blok M No. 44, Jakarta Selatan',
                ],
                'questionnaire' => [
                    'k1' => 5, 'k2' => 5, 'k3' => 5, 'k4' => 4, 'k5' => 5, 'k6' => 5, 'k7' => 5,
                    'a1' => 5, 'a2' => 4, 'a3' => 5, 'a4' => 5, 'a5' => 5, 'a6' => 5, 'a7' => 4,
                    'b1' => 5, 'b2' => 5, 'b3' => 5, 'b4' => 4, 'b5' => 5, 'b6' => 5, 'b7' => 5,
                ]
            ],
            [
                'employee' => [
                    'employee_code' => 'EMP109',
                    'name' => 'Hendra Gunawan',
                    'department' => 'Pemasaran',
                    'position' => 'Sales Manager',
                    'gender' => 'Laki-laki',
                    'phone' => '+62 812 9999 9999',
                    'address' => 'Jl. Rasuna Said No. 55, Jakarta Selatan',
                ],
                'questionnaire' => [
                    'k1' => 2, 'k2' => 2, 'k3' => 3, 'k4' => 2, 'k5' => 3, 'k6' => 2, 'k7' => 3,
                    'a1' => 2, 'a2' => 3, 'a3' => 2, 'a4' => 2, 'a5' => 3, 'a6' => 2, 'a7' => 3,
                    'b1' => 2, 'b2' => 2, 'b3' => 3, 'b4' => 2, 'b5' => 2, 'b6' => 3, 'b7' => 2,
                ]
            ],
            [
                'employee' => [
                    'employee_code' => 'EMP110',
                    'name' => 'Ratna Dewi',
                    'department' => 'Sumber Daya Manusia',
                    'position' => 'HR Officer',
                    'gender' => 'Perempuan',
                    'phone' => '+62 812 1010 1010',
                    'address' => 'Jl. Cikini No. 66, Jakarta Pusat',
                ],
                'questionnaire' => [
                    'k1' => 4, 'k2' => 4, 'k3' => 4, 'k4' => 5, 'k5' => 4, 'k6' => 4, 'k7' => 4,
                    'a1' => 4, 'a2' => 4, 'a3' => 5, 'a4' => 4, 'a5' => 4, 'a6' => 4, 'a7' => 5,
                    'b1' => 4, 'b2' => 5, 'b3' => 4, 'b4' => 4, 'b5' => 4, 'b6' => 5, 'b7' => 4,
                ]
            ],
        ];

        foreach ($employeesData as $data) {
            // Create employee
            $employee = Employee::create($data['employee']);

            // Create questionnaire response
            $questionnaireData = $data['questionnaire'];
            $questionnaireData['employee_id'] = $employee->id;
            
            Questionnaire::create($questionnaireData);
        }

        $this->command->info('✅ Berhasil membuat 10 karyawan dengan kuesioner lengkap!');
        $this->command->info('📊 Data siap untuk analisis clustering K-Means');
    }
}
