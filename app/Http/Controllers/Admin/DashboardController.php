<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Questionnaire;
use App\Models\ClusterResult;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(Request $request): Response
    {
        // Get cluster statistics for admin dashboard
        $totalEmployees = Employee::count();
        $totalQuestionnaires = Questionnaire::count();
        $totalClusters = ClusterResult::count();

        // Get cluster distribution
        $clusterStats = ClusterResult::selectRaw('label, COUNT(*) as count')
            ->groupBy('label')
            ->get()
            ->keyBy('label');

        $c3Count = $clusterStats->get('C3')?->count ?? 0;
        $c2Count = $clusterStats->get('C2')?->count ?? 0;
        $c1Count = $clusterStats->get('C1')?->count ?? 0;

        // Calculate percentages
        $total = $c3Count + $c2Count + $c1Count;
        $clusterDistribution = [
            'low' => [
                'count' => $c3Count,
                'percentage' => $total > 0 ? round(($c3Count / $total) * 100, 1) : 0,
                'employees' => ClusterResult::with('employee')
                    ->where('label', 'C3')
                    ->get()
                    ->map(fn($cr) => $cr->employee)
            ],
            'medium' => [
                'count' => $c2Count,
                'percentage' => $total > 0 ? round(($c2Count / $total) * 100, 1) : 0,
                'employees' => ClusterResult::with('employee')
                    ->where('label', 'C2')
                    ->get()
                    ->map(fn($cr) => $cr->employee)
            ],
            'high' => [
                'count' => $c1Count,
                'percentage' => $total > 0 ? round(($c1Count / $total) * 100, 1) : 0,
                'employees' => ClusterResult::with('employee')
                    ->where('label', 'C1')
                    ->get()
                    ->map(fn($cr) => $cr->employee)
            ]
        ];

        // Get breakdown by gender
        $genderBreakdown = $this->getClusterBreakdownByGender();

        // Get breakdown by age group
        $ageBreakdown = $this->getClusterBreakdownByAge();

        // Get breakdown by education level
        $educationBreakdown = $this->getClusterBreakdownByEducation();

        return Inertia::render('Admin/Dashboard/Index', [
            'user' => $request->user(),
            'stats' => [
                'totalEmployees' => $totalEmployees,
                'totalQuestionnaires' => $totalQuestionnaires,
                'totalClusters' => $totalClusters,
            ],
            'clusterDistribution' => $clusterDistribution,
            'genderBreakdown' => $genderBreakdown,
            'ageBreakdown' => $ageBreakdown,
            'educationBreakdown' => $educationBreakdown,
        ]);
    }

    /**
     * Get cluster breakdown by gender
     */
    private function getClusterBreakdownByGender(): array
    {
        $breakdown = ClusterResult::join('employees', 'cluster_results.employee_id', '=', 'employees.id')
            ->selectRaw('cluster_results.label, employees.gender, COUNT(*) as count')
            ->groupBy('cluster_results.label', 'employees.gender')
            ->get();

        $result = [
            'C1' => ['Laki-laki' => 0, 'Perempuan' => 0],
            'C2' => ['Laki-laki' => 0, 'Perempuan' => 0],
            'C3' => ['Laki-laki' => 0, 'Perempuan' => 0],
        ];

        foreach ($breakdown as $item) {
            if (isset($result[$item->label][$item->gender])) {
                $result[$item->label][$item->gender] = $item->count;
            }
        }

        return $result;
    }

    /**
     * Get cluster breakdown by age group
     */
    private function getClusterBreakdownByAge(): array
    {
        $clusterResults = ClusterResult::with('employee')->get();

        $ageGroups = [
            '18-25' => ['C1' => 0, 'C2' => 0, 'C3' => 0],
            '26-35' => ['C1' => 0, 'C2' => 0, 'C3' => 0],
            '36-45' => ['C1' => 0, 'C2' => 0, 'C3' => 0],
            '46-55' => ['C1' => 0, 'C2' => 0, 'C3' => 0],
            '56+' => ['C1' => 0, 'C2' => 0, 'C3' => 0],
        ];

        foreach ($clusterResults as $result) {
            if ($result->employee && $result->employee->age) {
                $age = $result->employee->age;
                $label = $result->label;

                if ($age >= 18 && $age <= 25) {
                    $ageGroups['18-25'][$label]++;
                } elseif ($age >= 26 && $age <= 35) {
                    $ageGroups['26-35'][$label]++;
                } elseif ($age >= 36 && $age <= 45) {
                    $ageGroups['36-45'][$label]++;
                } elseif ($age >= 46 && $age <= 55) {
                    $ageGroups['46-55'][$label]++;
                } elseif ($age >= 56) {
                    $ageGroups['56+'][$label]++;
                }
            }
        }

        return $ageGroups;
    }

    /**
     * Get cluster breakdown by education level
     */
    private function getClusterBreakdownByEducation(): array
    {
        $breakdown = ClusterResult::join('employees', 'cluster_results.employee_id', '=', 'employees.id')
            ->selectRaw('cluster_results.label, employees.education_level, COUNT(*) as count')
            ->whereNotNull('employees.education_level')
            ->groupBy('cluster_results.label', 'employees.education_level')
            ->get();

        $educationLevels = [
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
        ];

        $result = [];
        foreach ($educationLevels as $level) {
            $result[$level] = ['C1' => 0, 'C2' => 0, 'C3' => 0];
        }

        foreach ($breakdown as $item) {
            if (isset($result[$item->education_level][$item->label])) {
                $result[$item->education_level][$item->label] = $item->count;
            }
        }

        return $result;
    }
}
