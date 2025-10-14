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
