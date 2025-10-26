<?php

namespace App\Http\Controllers\User;

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
     * Display the user dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Check if user has an employee record
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
