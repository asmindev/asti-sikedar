<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            return Inertia::render('Admin/Dashboard/Index', [
                'user' => $user
            ]);
        }

        return Inertia::render('User/Dashboard/Index', [
            'user' => $user
        ]);
    }
}
