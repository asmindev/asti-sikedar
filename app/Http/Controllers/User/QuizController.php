<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Questionnaire;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    /**
     * Show the quiz form for the authenticated user.
     */
    public function index()
    {
        $user = Auth::user();
        $employee = $user->employee_id ? Employee::find($user->employee_id) : null;

        if (!$employee) {
            return redirect()->route('user.dashboard')
                ->with('error', 'Employee profile not found. Please contact administrator.');
        }

        // Check if user has already completed the questionnaire
        $existingQuestionnaire = Questionnaire::where('employee_id', $employee->id)->first();

        if ($existingQuestionnaire) {
            return redirect()->route('user.results')
                ->with('info', 'You have already completed the questionnaire. View your results below.');
        }

        // Get questions from database grouped by aspect
        $questions = [
            'knowledge' => QuizQuestion::active()
                ->forAspect('knowledge')
                ->ordered()
                ->get(['id', 'question', 'order'])
                ->values()
                ->toArray(),
            'attitude' => QuizQuestion::active()
                ->forAspect('attitude')
                ->ordered()
                ->get(['id', 'question', 'order'])
                ->values()
                ->toArray(),
            'behavior' => QuizQuestion::active()
                ->forAspect('behavior')
                ->ordered()
                ->get(['id', 'question', 'order'])
                ->values()
                ->toArray(),
        ];

        return Inertia::render('quiz/Quiz', [
            'employee' => $employee,
            'quizQuestions' => $questions
        ]);
    }

    /**
     * Store the quiz answers.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $employee = $user->employee_id ? Employee::find($user->employee_id) : null;

        if (!$employee) {
            return back()->withErrors(['error' => 'Employee profile not found.']);
        }

        // Check if user has already completed the questionnaire
        $existingQuestionnaire = Questionnaire::where('employee_id', $employee->id)->first();

        if ($existingQuestionnaire) {
            return back()->withErrors(['error' => 'You have already completed the questionnaire.']);
        }

        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'k1' => 'required|integer|min:1|max:5',
            'k2' => 'required|integer|min:1|max:5',
            'k3' => 'required|integer|min:1|max:5',
            'k4' => 'required|integer|min:1|max:5',
            'k5' => 'required|integer|min:1|max:5',
            'k6' => 'required|integer|min:1|max:5',
            'k7' => 'required|integer|min:1|max:5',
            'a1' => 'required|integer|min:1|max:5',
            'a2' => 'required|integer|min:1|max:5',
            'a3' => 'required|integer|min:1|max:5',
            'a4' => 'required|integer|min:1|max:5',
            'a5' => 'required|integer|min:1|max:5',
            'a6' => 'required|integer|min:1|max:5',
            'a7' => 'required|integer|min:1|max:5',
            'b1' => 'required|integer|min:1|max:5',
            'b2' => 'required|integer|min:1|max:5',
            'b3' => 'required|integer|min:1|max:5',
            'b4' => 'required|integer|min:1|max:5',
            'b5' => 'required|integer|min:1|max:5',
            'b6' => 'required|integer|min:1|max:5',
            'b7' => 'required|integer|min:1|max:5',
        ]);

        // Verify the employee belongs to the authenticated user
        if ($validated['employee_id'] != $employee->id) {
            return back()->withErrors(['error' => 'Unauthorized access.']);
        }

        try {
            Questionnaire::create($validated);

            return redirect()->route('user.results')
                ->with('toast', [
                    'type' => 'success',
                    'title' => 'Kuis Selesai!',
                    'message' => 'Terima kasih telah menyelesaikan kuis keamanan siber. Hasil sudah tersimpan.',
                    'duration' => 5000
                ]);
        } catch (\Exception $e) {
            return back()
                ->withErrors(['error' => 'Failed to save quiz answers. Please try again.'])
                ->with('toast', [
                    'type' => 'error',
                    'title' => 'Gagal Menyimpan',
                    'message' => 'Terjadi kesalahan saat menyimpan jawaban. Silakan coba lagi.',
                    'duration' => 4000
                ]);
        }
    }

    /**
     * Show the quiz result (readonly) for the authenticated user.
     */
    public function result()
    {
        $user = Auth::user();
        $employee = $user->employee_id ? Employee::find($user->employee_id) : null;

        if (!$employee) {
            return redirect()->route('user.dashboard')
                ->with('error', 'Employee profile not found. Please contact administrator.');
        }

        // Get the questionnaire result
        $questionnaire = Questionnaire::where('employee_id', $employee->id)->first();

        if (!$questionnaire) {
            return redirect()->route('user.quiz')
                ->with('info', 'You have not completed the questionnaire yet. Please complete it first.');
        }

        // Get questions from database grouped by aspect
        $questions = [
            'knowledge' => QuizQuestion::active()
                ->forAspect('knowledge')
                ->ordered()
                ->get(['id', 'question', 'order'])
                ->map(function ($q, $index) {
                    return [
                        'key' => 'k' . ($index + 1),
                        'text' => $q->question
                    ];
                })
                ->toArray(),
            'attitude' => QuizQuestion::active()
                ->forAspect('attitude')
                ->ordered()
                ->get(['id', 'question', 'order'])
                ->map(function ($q, $index) {
                    return [
                        'key' => 'a' . ($index + 1),
                        'text' => $q->question
                    ];
                })
                ->toArray(),
            'behavior' => QuizQuestion::active()
                ->forAspect('behavior')
                ->ordered()
                ->get(['id', 'question', 'order'])
                ->map(function ($q, $index) {
                    return [
                        'key' => 'b' . ($index + 1),
                        'text' => $q->question
                    ];
                })
                ->toArray(),
        ];

        return Inertia::render('User/Quiz/Result', [
            'employee' => $employee,
            'questionnaire' => $questionnaire,
            'questions' => $questions
        ]);
    }
}
