<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Questionnaire;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserResultController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $employee = $user->employee_id ? Employee::find($user->employee_id) : null;

        $questionnaire = null;
        $hasCompletedQuiz = false;

        if ($employee) {
            $questionnaire = Questionnaire::where('employee_id', $employee->id)->first();
            $hasCompletedQuiz = $questionnaire !== null;
        }

        return Inertia::render('User/Results/Index', [
            'user' => $user,
            'employee' => $employee,
            'questionnaire' => $questionnaire,
            'hasCompletedQuiz' => $hasCompletedQuiz,
            'results' => $questionnaire ? [
                'knowledge_score' => $questionnaire->k_average,
                'attitude_score' => $questionnaire->a_average,
                'behavior_score' => $questionnaire->b_average,
                'overall_score' => ($questionnaire->k_average + $questionnaire->a_average + $questionnaire->b_average) / 3
            ] : null
        ]);
    }
}
