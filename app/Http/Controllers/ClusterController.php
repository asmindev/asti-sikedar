<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Questionnaire;

class ClusterController extends Controller
{
    public function index()
    {
        $questionnaires = Questionnaire::with('employee')->get()->map(function ($q) {
            return [
                'id' => $q->id,
                'employee_id' => $q->employee_id,
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

        return Inertia::render('Admin/Clusters/Analysis', [
            'questionnaires' => $questionnaires,
        ]);
    }
}
