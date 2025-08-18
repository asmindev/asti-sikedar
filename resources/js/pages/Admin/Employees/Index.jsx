import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Users } from 'lucide-react';

export default function EmployeeIndex({ employees }) {
    const breadcrumbs = [{ label: 'Dashboard', href: route('admin.dashboard') }, { label: 'Employee Management' }];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />

            <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
                        <p className="text-muted-foreground">Manage your employees and their information</p>
                    </div>
                    <Button asChild>
                        <a href={route('admin.employees.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Employee
                        </a>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Users className="mr-2 h-5 w-5" />
                            Employee List
                        </CardTitle>
                        <CardDescription>{employees.length > 0 ? `${employees.length} employees found` : 'No employees added yet'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {employees.length > 0 ? (
                            <div className="space-y-4">
                                {/* TODO: Add employee table/list */}
                                <p className="text-muted-foreground">Employee list will be displayed here</p>
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-semibold">No employees</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Get started by adding your first employee.</p>
                                <div className="mt-6">
                                    <Button asChild>
                                        <a href={route('admin.employees.create')}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Employee
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
