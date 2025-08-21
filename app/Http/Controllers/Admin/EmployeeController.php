<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index(): Response
    {
        $employees = Employee::with(['user', 'questionnaire', 'clusterResult'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Employees/Index', [
            'employees' => $employees,
        ]);
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Employees/Create');
    }

    /**
     * Store a newly created employee in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nip' => 'required|string|unique:employees,nip|max:255',
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:18|max:100',
            'education' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $employee = Employee::create($validated);

        return redirect()
            ->route('admin.employees.index')
            ->with('success', 'Employee created successfully.');
    }

    /**
     * Display the specified employee.
     */
    public function show(Employee $employee): Response
    {
        $employee->load(['user', 'questionnaire', 'clusterResult']);

        return Inertia::render('Admin/Employees/Show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified employee.
     */
    public function edit(Employee $employee): Response
    {
        return Inertia::render('Admin/Employees/Edit', [
            'employee' => $employee,
        ]);
    }

    /**
     * Update the specified employee in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'nip' => 'required|string|max:255|unique:employees,nip,' . $employee->id,
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:18|max:100',
            'education' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $employee->update($validated);

        return redirect()
            ->route('admin.employees.index')
            ->with('success', 'Employee updated successfully.');
    }

    /**
     * Remove the specified employee from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()
            ->route('admin.employees.index')
            ->with('success', 'Employee deleted successfully.');
    }
}
