<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Questionnaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class QuestionnaireController extends Controller
{
    /**
     * Display a listing of questionnaires.
     */
    public function index(): Response
    {
        $questionnaires = Questionnaire::with('employee')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Questionnaires/Index', [
            'questionnaires' => $questionnaires,
            'totalEmployees' => Employee::count(),
            'completedQuestionnaires' => Questionnaire::count(),
        ]);
    }

    /**
     * Show the form for creating a new questionnaire.
     */
    public function create(): Response
    {
        $employees = Employee::whereDoesntHave('questionnaire')->get(['id', 'nip', 'name']);

        return Inertia::render('Admin/Questionnaires/Create', [
            'employees' => $employees,
        ]);
    }

    /**
     * Store a newly created questionnaire.
     */
    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'k1' => 'required|integer|between:1,5',
            'k2' => 'required|integer|between:1,5',
            'k3' => 'required|integer|between:1,5',
            'k4' => 'required|integer|between:1,5',
            'k5' => 'required|integer|between:1,5',
            'k6' => 'required|integer|between:1,5',
            'k7' => 'required|integer|between:1,5',
            'a1' => 'required|integer|between:1,5',
            'a2' => 'required|integer|between:1,5',
            'a3' => 'required|integer|between:1,5',
            'a4' => 'required|integer|between:1,5',
            'a5' => 'required|integer|between:1,5',
            'a6' => 'required|integer|between:1,5',
            'a7' => 'required|integer|between:1,5',
            'b1' => 'required|integer|between:1,5',
            'b2' => 'required|integer|between:1,5',
            'b3' => 'required|integer|between:1,5',
            'b4' => 'required|integer|between:1,5',
            'b5' => 'required|integer|between:1,5',
            'b6' => 'required|integer|between:1,5',
            'b7' => 'required|integer|between:1,5',
        ]);

        Questionnaire::create($request->all());

        return redirect()->route('admin.questionnaires.index')
            ->with('success', 'Questionnaire created successfully.');
    }

    /**
     * Display the specified questionnaire.
     */
    public function show(Questionnaire $questionnaire): Response
    {
        $questionnaire->load('employee');

        return Inertia::render('Admin/Questionnaires/Show', [
            'questionnaire' => $questionnaire,
        ]);
    }

    /**
     * Show the form for editing the specified questionnaire.
     */
    public function edit(Questionnaire $questionnaire): Response
    {
        $questionnaire->load('employee');

        return Inertia::render('Admin/Questionnaires/Edit', [
            'questionnaire' => $questionnaire,
        ]);
    }

    /**
     * Update the specified questionnaire.
     */
    public function update(Request $request, Questionnaire $questionnaire)
    {
        $request->validate([
            'k1' => 'required|integer|between:1,5',
            'k2' => 'required|integer|between:1,5',
            'k3' => 'required|integer|between:1,5',
            'k4' => 'required|integer|between:1,5',
            'k5' => 'required|integer|between:1,5',
            'k6' => 'required|integer|between:1,5',
            'k7' => 'required|integer|between:1,5',
            'a1' => 'required|integer|between:1,5',
            'a2' => 'required|integer|between:1,5',
            'a3' => 'required|integer|between:1,5',
            'a4' => 'required|integer|between:1,5',
            'a5' => 'required|integer|between:1,5',
            'a6' => 'required|integer|between:1,5',
            'a7' => 'required|integer|between:1,5',
            'b1' => 'required|integer|between:1,5',
            'b2' => 'required|integer|between:1,5',
            'b3' => 'required|integer|between:1,5',
            'b4' => 'required|integer|between:1,5',
            'b5' => 'required|integer|between:1,5',
            'b6' => 'required|integer|between:1,5',
            'b7' => 'required|integer|between:1,5',
        ]);

        $questionnaire->update($request->all());

        return redirect()->route('admin.questionnaires.index')
            ->with('success', 'Questionnaire updated successfully.');
    }

    /**
     * Remove the specified questionnaire.
     */
    public function destroy(Questionnaire $questionnaire)
    {
        $questionnaire->delete();

        return redirect()->route('admin.questionnaires.index')
            ->with('success', 'Questionnaire deleted successfully.');
    }

    /**
     * Handle CSV file upload and process questionnaire data.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        try {
            $file = $request->file('file');
            $csvData = array_map('str_getcsv', file($file->path()));

            // Remove header row if exists
            $header = array_shift($csvData);

            $imported = 0;
            $errors = [];

            DB::beginTransaction();

            foreach ($csvData as $index => $row) {
                $lineNumber = $index + 2; // +2 because we removed header and want 1-based indexing

                try {
                    // Expected CSV format: nip, k1-k7, a1-a7, b1-b7 (22 columns total)
                    if (count($row) < 22) {
                        throw new \Exception("Insufficient columns. Expected 22, got " . count($row));
                    }

                    $nip = trim($row[0]);

                    // Find employee by NIP
                    $employee = Employee::where('nip', $nip)->first();

                    if (!$employee) {
                        throw new \Exception("Employee with NIP '{$nip}' not found");
                    }

                    // Validate all scores are between 1-5
                    $scores = array_slice($row, 1, 21);
                    foreach ($scores as $scoreIndex => $score) {
                        $score = (int) $score;
                        if ($score < 1 || $score > 5) {
                            throw new \Exception("Invalid score '{$score}' at column " . ($scoreIndex + 2) . ". Must be between 1-5");
                        }
                    }

                    // Create or update questionnaire
                    Questionnaire::updateOrCreate(
                        ['employee_id' => $employee->id],
                        [
                            'k1' => (int) $row[1],
                            'k2' => (int) $row[2],
                            'k3' => (int) $row[3],
                            'k4' => (int) $row[4],
                            'k5' => (int) $row[5],
                            'k6' => (int) $row[6],
                            'k7' => (int) $row[7],
                            'a1' => (int) $row[8],
                            'a2' => (int) $row[9],
                            'a3' => (int) $row[10],
                            'a4' => (int) $row[11],
                            'a5' => (int) $row[12],
                            'a6' => (int) $row[13],
                            'a7' => (int) $row[14],
                            'b1' => (int) $row[15],
                            'b2' => (int) $row[16],
                            'b3' => (int) $row[17],
                            'b4' => (int) $row[18],
                            'b5' => (int) $row[19],
                            'b6' => (int) $row[20],
                            'b7' => (int) $row[21],
                        ]
                    );

                    $imported++;
                } catch (\Exception $e) {
                    $errors[] = "Line {$lineNumber}: " . $e->getMessage();
                }
            }

            DB::commit();

            if (count($errors) > 0) {
                return back()->with([
                    'success' => "{$imported} questionnaires imported successfully.",
                    'warnings' => $errors,
                ]);
            }

            return back()->with('success', "{$imported} questionnaires imported successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            throw ValidationException::withMessages([
                'file' => 'Failed to process CSV file: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Download a sample CSV template.
     */
    public function downloadTemplate()
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="questionnaire_template.csv"',
        ];

        $csvHeaders = ['nip', 'k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'];
        $sampleData = ['EMP001', 4, 3, 5, 2, 4, 3, 5, 3, 4, 2, 5, 3, 4, 3, 2, 4, 3, 5, 2, 4, 3];

        $callback = function () use ($csvHeaders, $sampleData) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $csvHeaders);
            fputcsv($file, $sampleData);
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
