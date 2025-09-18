<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Questionnaire;
use App\Models\ClusterResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClusterController extends Controller
{
    public function index()
    {
        $questionnaires = Questionnaire::with('employee')->get()->map(function ($q) {
            return [
                'id' => $q->id,
                'employee' => $q->employee,
                'k1' => $q->k1,
                'k2' => $q->k2,
                'k3' => $q->k3,
                'k4' => $q->k4,
                'k5' => $q->k5,
                'k6' => $q->k6,
                'k7' => $q->k7,
                'a1' => $q->a1,
                'a2' => $q->a2,
                'a3' => $q->a3,
                'a4' => $q->a4,
                'a5' => $q->a5,
                'a6' => $q->a6,
                'a7' => $q->a7,
                'b1' => $q->b1,
                'b2' => $q->b2,
                'b3' => $q->b3,
                'b4' => $q->b4,
                'b5' => $q->b5,
                'b6' => $q->b6,
                'b7' => $q->b7,
            ];
        });

        // Get analysis statistics
        $totalSavedResults = ClusterResult::count();
        $lastAnalysisDate = ClusterResult::latest('updated_at')->first()?->updated_at;

        // Get cluster distribution
        $clusterDistribution = ClusterResult::selectRaw('label, COUNT(*) as count')
            ->groupBy('label')
            ->get()
            ->keyBy('label');

        // Get saved cluster results with employee details
        $savedResults = ClusterResult::with('employee')
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($result) {
                return [
                    'id' => $result->id,
                    'employee' => $result->employee,
                    'cluster' => $result->cluster,
                    'label' => $result->label,
                    'score_k' => $result->score_k,
                    'score_a' => $result->score_a,
                    'score_b' => $result->score_b,
                    'updated_at' => $result->updated_at,
                ];
            });

        return Inertia::render('Admin/Clusters/Analysis', [
            'questionnaires' => $questionnaires,
            'savedResults' => $savedResults,
            'analysisStats' => [
                'totalSavedResults' => $totalSavedResults,
                'lastAnalysisDate' => $lastAnalysisDate,
                'clusterDistribution' => [
                    'low' => $clusterDistribution->get('Low')?->count ?? 0,
                    'medium' => $clusterDistribution->get('Medium')?->count ?? 0,
                    'high' => $clusterDistribution->get('High')?->count ?? 0,
                ]
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'results' => 'required|array',
            'results.*.employee_id' => 'required|integer|exists:employees,id',
            'results.*.cluster' => 'required|integer',
            'results.*.label' => 'required|string|in:Low,Medium,High',
            'results.*.score_k' => 'required|numeric',
            'results.*.score_a' => 'required|numeric',
            'results.*.score_b' => 'required|numeric',
        ]);

        try {
            DB::transaction(function () use ($request) {
                // Delete existing cluster results for these employees
                $employeeIds = collect($request->results)->pluck('employee_id');
                ClusterResult::whereIn('employee_id', $employeeIds)->delete();

                // Insert new cluster results
                foreach ($request->results as $result) {
                    ClusterResult::create([
                        'employee_id' => $result['employee_id'],
                        'cluster' => $result['cluster'],
                        'label' => $result['label'],
                        'score_k' => $result['score_k'],
                        'score_a' => $result['score_a'],
                        'score_b' => $result['score_b'],
                    ]);
                }
            });

            return response()->json([
                'message' => 'Cluster results saved successfully',
                'saved_count' => count($request->results)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to save cluster results',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
