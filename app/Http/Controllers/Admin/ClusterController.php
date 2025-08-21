<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClusterResult;
use App\Models\Employee;
use App\Models\Questionnaire;
use App\Services\KMeansService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ClusterController extends Controller
{
    public function __construct(
        protected KMeansService $kmeansService
    ) {}

    /**
     * Show the cluster analysis page.
     */
    public function analysis(): Response
    {
        $totalEmployees = Employee::count();
        $completedQuestionnaires = Questionnaire::count();
        $existingResults = ClusterResult::count();

        $clusterSummary = ClusterResult::select('cluster', 'label')
            ->selectRaw('COUNT(*) as count')
            ->selectRaw('AVG(score_k) as avg_k')
            ->selectRaw('AVG(score_a) as avg_a')
            ->selectRaw('AVG(score_b) as avg_b')
            ->groupBy('cluster', 'label')
            ->orderBy('cluster')
            ->get();

        return Inertia::render('Admin/Clusters/Analysis', [
            'statistics' => [
                'total_employees' => $totalEmployees,
                'completed_questionnaires' => $completedQuestionnaires,
                'existing_results' => $existingResults,
            ],
            'cluster_summary' => $clusterSummary,
        ]);
    }

    /**
     * Run K-Means clustering analysis.
     */
    public function run(Request $request)
    {
        $request->validate([
            'clusters' => 'required|integer|min:2|max:5',
        ]);

        try {
            // Get all questionnaires with employee data
            $questionnaires = Questionnaire::with('employee')->get();

            if ($questionnaires->count() < $request->clusters) {
                return back()->withErrors([
                    'clusters' => 'Number of clusters cannot exceed number of completed questionnaires.',
                ]);
            }

            // Prepare data samples for clustering
            $samples = [];
            $employeeIds = [];

            foreach ($questionnaires as $questionnaire) {
                $samples[] = [
                    $questionnaire->k_average,
                    $questionnaire->a_average,
                    $questionnaire->b_average,
                ];
                $employeeIds[] = $questionnaire->employee_id;
            }

            DB::beginTransaction();

            // Clear existing cluster results
            ClusterResult::truncate();

            // Run K-Means clustering
            $clusterResults = $this->kmeansService->cluster($samples, $request->clusters);

            // Process and save results
            foreach ($clusterResults as $index => $cluster) {
                $employeeId = $employeeIds[$index];
                $sample = $samples[$index];

                // Determine performance label based on average scores
                $avgScore = array_sum($sample) / 3;
                $label = $this->determinePerformanceLabel($avgScore);

                ClusterResult::create([
                    'employee_id' => $employeeId,
                    'cluster' => $cluster,
                    'label' => $label,
                    'score_k' => $sample[0],
                    'score_a' => $sample[1],
                    'score_b' => $sample[2],
                ]);
            }

            DB::commit();

            return back()->with('success', 'K-Means clustering analysis completed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors([
                'error' => 'Clustering analysis failed: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Export cluster results as PDF.
     */
    public function exportPdf()
    {
        $results = ClusterResult::with('employee')
            ->orderBy('cluster')
            ->orderBy('label')
            ->get();

        // TODO: Implement PDF generation using DomPDF
        // For now, return JSON response
        return response()->json([
            'message' => 'PDF export functionality will be implemented',
            'results_count' => $results->count(),
        ]);
    }

    /**
     * Determine performance label based on average score.
     */
    private function determinePerformanceLabel(float $avgScore): string
    {
        if ($avgScore >= 4.0) {
            return 'High';
        } elseif ($avgScore >= 3.0) {
            return 'Medium';
        } else {
            return 'Low';
        }
    }
}
