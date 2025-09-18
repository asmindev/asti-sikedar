<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LikertOption;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;

class QuizDataController extends Controller
{
    public function getQuizData()
    {
        try {
            $quizData = QuizQuestion::getGroupedQuestions();
            $likertScale = LikertOption::getActiveOptions();
            $aspectTitles = QuizQuestion::getAspects();

            // Count questions per aspect
            $totalQuestions = QuizQuestion::active()->count();
            $questionsPerAspect = 7; // This should be calculated dynamically if needed

            return response()->json([
                'success' => true,
                'data' => [
                    'quizData' => $quizData,
                    'likertScale' => $likertScale,
                    'aspectTitles' => $aspectTitles,
                    'totalQuestions' => $totalQuestions,
                    'questionsPerAspect' => $questionsPerAspect
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch quiz data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
