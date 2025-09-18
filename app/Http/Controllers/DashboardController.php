<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Questionnaire;
use App\Models\ClusterResult;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            // Get cluster statistics for admin dashboard
            $totalEmployees = Employee::count();
            $totalQuestionnaires = Questionnaire::count();
            $totalClusters = ClusterResult::count();

            // Get cluster distribution
            $clusterStats = ClusterResult::selectRaw('label, COUNT(*) as count')
                ->groupBy('label')
                ->get()
                ->keyBy('label');

            $lowCount = $clusterStats->get('Low')?->count ?? 0;
            $mediumCount = $clusterStats->get('Medium')?->count ?? 0;
            $highCount = $clusterStats->get('High')?->count ?? 0;

            // Calculate percentages
            $total = $lowCount + $mediumCount + $highCount;
            $clusterDistribution = [
                'low' => [
                    'count' => $lowCount,
                    'percentage' => $total > 0 ? round(($lowCount / $total) * 100, 1) : 0,
                    'employees' => ClusterResult::with('employee')
                        ->where('label', 'Low')
                        ->get()
                        ->map(fn($cr) => $cr->employee)
                ],
                'medium' => [
                    'count' => $mediumCount,
                    'percentage' => $total > 0 ? round(($mediumCount / $total) * 100, 1) : 0,
                    'employees' => ClusterResult::with('employee')
                        ->where('label', 'Medium')
                        ->get()
                        ->map(fn($cr) => $cr->employee)
                ],
                'high' => [
                    'count' => $highCount,
                    'percentage' => $total > 0 ? round(($highCount / $total) * 100, 1) : 0,
                    'employees' => ClusterResult::with('employee')
                        ->where('label', 'High')
                        ->get()
                        ->map(fn($cr) => $cr->employee)
                ]
            ];

            return Inertia::render('Admin/Dashboard/Index', [
                'user' => $user,
                'stats' => [
                    'totalEmployees' => $totalEmployees,
                    'totalQuestionnaires' => $totalQuestionnaires,
                    'totalClusters' => $totalClusters,
                ],
                'clusterDistribution' => $clusterDistribution
            ]);
        }

        // For regular users, check if they have completed the quiz
        $employee = $user->employee_id ? Employee::find($user->employee_id) : null;
        $hasCompletedQuiz = false;
        $clusterResult = null;
        $questionnaire = null;

        if ($employee) {
            $questionnaire = Questionnaire::where('employee_id', $employee->id)->first();
            $hasCompletedQuiz = $questionnaire !== null;

            // Get cluster result if available
            if ($hasCompletedQuiz) {
                $clusterResult = ClusterResult::where('employee_id', $employee->id)->first();
            }
        }

        return Inertia::render('User/Dashboard/Index', [
            'user' => $user,
            'employee' => $employee,
            'hasCompletedQuiz' => $hasCompletedQuiz,
            'clusterResult' => $clusterResult,
            'questionnaire' => $questionnaire
        ]);
    }
}
