<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionnaireImportController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Questionnaires/Upload');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        // TODO: Implement CSV upload and processing logic

        return redirect()->back()->with('success', 'CSV file uploaded and processed successfully');
    }
}
