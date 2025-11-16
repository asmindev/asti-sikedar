<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LikertOption;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizManagementController extends Controller
{
    public function index()
    {
        $questions = QuizQuestion::orderBy('aspect')->orderBy('order')->get();
        $likertOptions = LikertOption::orderBy('order')->get();
        $stats = [
            'totalResponses' => 0, // Add real stats if needed
            'avgCompletionTime' => 'N/A',
        ];

        return Inertia::render('Admin/QuizManagement/Index', [
            'questions' => $questions,
            'likertOptions' => $likertOptions,
            'stats' => $stats
        ]);
    }

    public function update(Request $request, QuizQuestion $quizManagement)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:1000',
            'is_reversed' => 'boolean'
        ]);

        $quizManagement->update($validated);

        return redirect()->back()->with('success', 'Question updated successfully.');
    }

    public function updateQuestion(Request $request, QuizQuestion $question)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:1000',
            'is_reversed' => 'boolean'
        ]);

        $question->update($validated);

        return back()->with('toast', [
            'type' => 'success',
            'title' => 'Question Updated',
            'message' => 'Question has been updated successfully.',
            'duration' => 3000
        ]);
    }

    public function updateLikertOption(Request $request, LikertOption $option)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:10',
            'description' => 'required|string|max:255'
        ]);

        $option->update($validated);

        return back()->with('toast', [
            'type' => 'success',
            'title' => 'Likert Option Updated',
            'message' => 'Likert option has been updated successfully.',
            'duration' => 3000
        ]);
    }

    public function reorderQuestions(Request $request)
    {
        $validated = $request->validate([
            'questions' => 'required|array',
            'questions.*.id' => 'required|exists:quiz_questions,id',
            'questions.*.order' => 'required|integer|min:1|max:7'
        ]);

        foreach ($validated['questions'] as $questionData) {
            QuizQuestion::where('id', $questionData['id'])
                ->update(['order' => $questionData['order']]);
        }

        return back()->with('toast', [
            'type' => 'success',
            'title' => 'Questions Reordered',
            'message' => 'Questions have been reordered successfully.',
            'duration' => 3000
        ]);
    }

    public function toggleQuestion(Request $request, QuizQuestion $question)
    {
        $question->update([
            'is_active' => !$question->is_active
        ]);

        return redirect()->back()->with('success', 'Question status updated successfully.');
    }
}
