<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserResultController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('User/Results/Index', [
            'user' => $user,
            'results' => [] // TODO: Get user's cluster results
        ]);
    }
}
