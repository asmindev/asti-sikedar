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
                    'name' => 'Andi Wijaya',
                    'position' => 'Senior Software Engineer',
                    'gender' => 'Laki-laki',
                    'birth_date' => '1990-05-15'
                ],
                'questionnaire' => [
                    'k1' => 5,
                    'k2' => 5,
                    'k3' => 4,
                    'k4' => 5,
                    'k5' => 5,
                    'k6' => 4,
                    'k7' => 5,
                    'a1' => 5,
                    'a2' => 4,
                    'a3' => 5,
                    'a4' => 5,
                    'a5' => 4,
                    'a6' => 5,
                    'a7' => 5,
                    'b1' => 5,
                    'b2' => 5,
                    'b3' => 4,
                    'b4' => 5,
                    'b5' => 5,
                    'b6' => 4,
                    'b7' => 5,
                ]
            ],
            [
                'employee' => [
                    'name' => 'Siti Nurhaliza',
                    'position' => 'HR Manager',
                    'gender' => 'Perempuan',
                    'birth_date' => '1990-05-15'
                ],
                'questionnaire' => [
                    'k1' => 4,
                    'k2' => 5,
                    'k3' => 4,
                    'k4' => 4,
                    'k5' => 5,
                    'k6' => 4,
                    'k7' => 4,
                    'a1' => 4,
                    'a2' => 4,
                    'a3' => 5,
                    'a4' => 4,
                    'a5' => 4,
                    'a6' => 5,
                    'a7' => 4,
                    'b1' => 4,
                    'b2' => 4,
                    'b3' => 5,
                    'b4' => 4,
                    'b5' => 4,
                    'b6' => 4,
                    'b7' => 5,
                ]
            ],
            [
                'employee' => [
                    'name' => 'Budi Santoso',
                    'position' => 'Financial Analyst',
                    'gender' => 'Laki-laki',
                    'birth_date' => '1988-11-20'
                ],
                'questionnaire' => [
                    'k1' => 3,
                    'k2' => 3,
                    'k3' => 4,
                    'k4' => 3,
                    'k5' => 3,
                    'k6' => 3,
                    'k7' => 4,
                    'a1' => 3,
                    'a2' => 3,
                    'a3' => 4,
                    'a4' => 3,
                    'a5' => 3,
                    'a6' => 4,
                    'a7' => 3,
                    'b1' => 3,
                    'b2' => 3,
                    'b3' => 3,
                    'b4' => 4,
                    'b5' => 3,
                    'b6' => 3,
                    'b7' => 4,
                ]
            ],
            [
                'employee' => [
                    'name' => 'Dewi Lestari',
                    'position' => 'Marketing Specialist',
                    'gender' => 'Perempuan',
                    'birth_date' => '1992-07-30'
                ],
                'questionnaire' => [
                    'k1' => 5,
                    'k2' => 4,
                    'k3' => 5,
                    'k4' => 5,
                    'k5' => 4,
                    'k6' => 5,
                    'k7' => 5,
                    'a1' => 5,
                    'a2' => 5,
                    'a3' => 4,
                    'a4' => 5,
                    'a5' => 5,
                    'a6' => 4,
                    'a7' => 5,
                    'b1' => 4,
                    'b2' => 5,
                    'b3' => 5,
                    'b4' => 5,
                    'b5' => 4,
                    'b6' => 5,
                    'b7' => 5,
                ]
            ],
            [
                'employee' => [
                    'name' => 'Rudi Hartono',
                    'position' => 'Operations Manager',
                    'gender' => 'Laki-laki',
                    'birth_date' => '1985-03-10'
                ],
                'questionnaire' => [
                    'k1' => 2,
                    'k2' => 3,
                    'k3' => 2,
                    'k4' => 3,
                    'k5' => 2,
                    'k6' => 3,
                    'k7' => 2,
                    'a1' => 2,
                    'a2' => 3,
                    'a3' => 2,
                    'a4' => 3,
                    'a5' => 2,
                    'a6' => 3,
                    'a7' => 2,
                    'b1' => 3,
                    'b2' => 2,
                    'b3' => 3,
                    'b4' => 2,
                    'b5' => 3,
                    'b6' => 2,
                    'b7' => 3,
                ]
            ],
            [
                'employee' => [
                    'name' => 'Linda Kusuma',
                    'position' => 'Legal Counsel',
                    'gender' => 'Perempuan',
                    'birth_date' => '1991-09-25'
                ],
                'questionnaire' => [
                    'k1' => 4,
                    'k2' => 4,
                    'k3' => 5,
                    'k4' => 4,
                    'k5' => 4,
                    'k6' => 4,
                    'k7' => 5,
                    'a1' => 4,
                    'a2' => 5,
                    'a3' => 4,
                    'a4' => 4,
                    'a5' => 5,
                    'a6' => 4,
                    'a7' => 4,
                    'b1' => 5,
                    'b2' => 4,
                    'b3' => 4,
                    'b4' => 5,
                    'b5' => 4,
                    'b6' => 4,
                    'b7' => 5,
                ]
            ],
            [
                'employee' => [
                    'name' => 'Ahmad Fauzi',
                    'position' => 'System Administrator',
                    'gender' => 'Laki-laki',
                    'birth_date' => '1987-12-05'
                ],
                'questionnaire' => [
                    'k1' => 3,
                    'k2' => 4,
                    'k3' => 3,
                    'k4' => 3,
                    'k5' => 4,
                    'k6' => 3,
                    'k7' => 4,
                    'a1' => 3,
                    'a2' => 3,
                    'a3' => 4,
                    'a4' => 3,
                    'a5' => 4,
                    'a6' => 3,
                    'a7' => 3,
                    'b1' => 4,
                    'b2' => 3,
                    'b3' => 3,
                    'b4' => 4,
                    'b5' => 3,
                    'b6' => 3,
                    'b7' => 4,
                ]
            ],
            [
                'employee' => [
                    'name' => 'Maya Sari',
                    'position' => 'Accountant',
                    'gender' => 'Perempuan',
                    'birth_date' => '1993-04-18'
                ],
                'questionnaire' => [
                    'k1' => 5,
                    'k2' => 5,
                    'k3' => 5,
                    'k4' => 4,
                    'k5' => 5,
                    'k6' => 5,
                    'k7' => 5,
                    'a1' => 5,
                    'a2' => 4,
                    'a3' => 5,
                    'a4' => 5,
                    'a5' => 5,
                    'a6' => 5,
                    'a7' => 4,
                    'b1' => 5,
                    'b2' => 5,
                    'b3' => 5,
                    'b4' => 4,
                    'b5' => 5,
                    'b6' => 5,
                    'b7' => 5,
                ]
            ],
            [
                'employee' => [
                    'name' => 'Hendra Gunawan',
                    'position' => 'Sales Manager',
                    'gender' => 'Laki-laki',
                    'birth_date' => '1986-08-12'
                ],
                'questionnaire' => [
                    'k1' => 2,
                    'k2' => 2,
                    'k3' => 3,
                    'k4' => 2,
                    'k5' => 3,
                    'k6' => 2,
                    'k7' => 3,
                    'a1' => 2,
                    'a2' => 3,
                    'a3' => 2,
                    'a4' => 2,
                    'a5' => 3,
                    'a6' => 2,
                    'a7' => 3,
                    'b1' => 2,
                    'b2' => 2,
                    'b3' => 3,
                    'b4' => 2,
                    'b5' => 2,
                    'b6' => 3,
                    'b7' => 2,
                ]
            ],
            [
                'employee' => [
                    'name' => 'Ratna Dewi',
                    'position' => 'HR Officer',
                    'gender' => 'Perempuan',
                    'birth_date' => '1994-02-28'
                ],
                'questionnaire' => [
                    'k1' => 4,
                    'k2' => 4,
                    'k3' => 4,
                    'k4' => 5,
                    'k5' => 4,
                    'k6' => 4,
                    'k7' => 4,
                    'a1' => 4,
                    'a2' => 4,
                    'a3' => 5,
                    'a4' => 4,
                    'a5' => 4,
                    'a6' => 4,
                    'a7' => 5,
                    'b1' => 4,
                    'b2' => 5,
                    'b3' => 4,
                    'b4' => 4,
                    'b5' => 4,
                    'b6' => 5,
                    'b7' => 4,
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
