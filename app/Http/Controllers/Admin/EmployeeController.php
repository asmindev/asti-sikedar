<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index(Request $request): Response
    {
        $query = Employee::with(['user'])
            ->when($request->search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('position', 'like', "%{$search}%");
            })
            ->when($request->sortBy, function ($query, $sortBy) use ($request) {
                $direction = $request->sortDirection === 'desc' ? 'desc' : 'asc';
                return $query->orderBy($sortBy, $direction);
            }, function ($query) {
                return $query->latest();
            });

        $employees = $query->paginate(10)->withQueryString();



        return Inertia::render('Admin/Employees/Index', [
            'employees' => $employees,
            'filters' => [
                'search' => $request->search,
                'sortBy' => $request->sortBy,
                'sortDirection' => $request->sortDirection,
            ]
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
    public function store(StoreEmployeeRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();

            // Create the employee
            $employee = Employee::create($request->only([
                'name',
                'position',
                'gender',
                'birth_date'
            ]));

            // Create user account if requested
            if ($request->boolean('create_user_account')) {
                $user = User::create([
                    'name' => $employee->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'role' => $request->role,
                    'employee_id' => $employee->id
                ]);

                $message = 'Employee created successfully with user account.';
            } else {
                $message = 'Employee created successfully.';
            }

            DB::commit();

            return redirect()
                ->route('admin.employees.index')
                ->with('success', $message);
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Failed to create employee. Please try again.');
        }
    }

    /**
     * Display the specified employee.
     */
    public function show(Employee $employee): Response
    {
        $employee->load(['user']);

        return Inertia::render('Admin/Employees/Show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified employee.
     */
    public function edit(Employee $employee): Response
    {
        $employee->load(['user']);

        return Inertia::render('Admin/Employees/Edit', [
            'employee' => $employee,
        ]);
    }

    /**
     * Update the specified employee in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee): RedirectResponse
    {
        Log::info('Update method called for employee: ' . $employee->id);
        Log::info('Request data: ' . json_encode($request->all()));

        try {
            DB::beginTransaction();

            // Log before update
            Log::info('Employee before update: ' . json_encode($employee->toArray()));

            // Update employee data
            $employee->update($request->only([
                'name',
                'position',
                'gender',
                'birth_date'
            ]));

            // Log after update
            Log::info('Employee after update: ' . json_encode($employee->fresh()->toArray()));

            // Handle user account creation/update
            if ($request->boolean('create_user_account')) {
                Log::info('Creating/updating user account');

                // Check for email uniqueness manually
                if ($request->filled('email')) {
                    $existingUser = User::where('email', $request->email)
                        ->where('id', '!=', $employee->user->id ?? 0)
                        ->first();

                    if ($existingUser) {
                        throw new \Exception('Email already exists for another user');
                    }
                }

                if ($employee->user) {
                    Log::info('Updating existing user');
                    // Update existing user
                    $userData = [
                        'name' => $employee->name,
                        'email' => $request->email,
                        'role' => $request->role,
                    ];

                    // Only update password if provided
                    if ($request->filled('password')) {
                        $userData['password'] = Hash::make($request->password);
                        Log::info('Password will be updated');
                    }

                    $employee->user->update($userData);
                } else {
                    Log::info('Creating new user account');
                    // Create new user account
                    User::create([
                        'name' => $employee->name,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                        'role' => $request->role,
                        'employee_id' => $employee->id
                    ]);
                }
                $message = 'Employee updated successfully with user account.';
            } else {
                Log::info('No user account management requested');
                $message = 'Employee updated successfully.';
            }

            DB::commit();
            Log::info('Transaction committed successfully');

            return redirect()
                ->route('admin.employees.index')
                ->with('success', $message);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating employee: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Failed to update employee. Please try again. Error: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified employee from storage.
     */
    public function destroy(Employee $employee): RedirectResponse
    {
        try {
            DB::beginTransaction();

            // Handle associated user account
            if ($employee->user) {
                // Set employee_id to null before deleting employee
                $employee->user->update(['employee_id' => null]);
            }

            $employee->delete();

            DB::commit();

            return redirect()
                ->route('admin.employees.index')
                ->with('success', 'Employee deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->with('error', 'Failed to delete employee. Please try again.');
        }
    }

    /**
     * Remove the user account associated with the employee.
     */
    public function removeUserAccount(Employee $employee): RedirectResponse
    {
        try {
            if (!$employee->user) {
                return redirect()
                    ->back()
                    ->with('error', 'No user account found for this employee.');
            }

            $employee->user->delete();

            return redirect()
                ->back()
                ->with('success', 'User account removed successfully.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Failed to remove user account. Please try again.');
        }
    }
}
