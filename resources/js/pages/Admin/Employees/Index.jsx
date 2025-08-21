import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Edit, Eye, Plus, Search, Trash2, UserCheck, UserMinus, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

export default function EmployeeIndex({ employees, departments, filters }) {
    const { flash } = usePage().props;
    console.log('EmployeeIndex props:', flash);
    const breadcrumbs = [{ label: 'Dashboard', href: route('admin.dashboard') }, { label: 'Employee Management' }];

    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        employee: null,
    });

    const [removeUserDialog, setRemoveUserDialog] = useState({
        open: false,
        employee: null,
    });

    const [search, setSearch] = useState(filters?.search || '');
    const [department, setDepartment] = useState(filters?.department || 'all');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            '/admin/employees',
            {
                search,
                department: department === 'all' ? '' : department,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDeleteClick = (employee) => {
        setDeleteDialog({
            open: true,
            employee: employee,
        });
    };

    const handleDeleteConfirm = () => {
        if (deleteDialog.employee) {
            router.delete(route('admin.employees.destroy', deleteDialog.employee.id));
        }
        setDeleteDialog({ open: false, employee: null });
    };

    const handleDeleteCancel = () => {
        setDeleteDialog({ open: false, employee: null });
    };

    const handleRemoveUserClick = (employee) => {
        setRemoveUserDialog({
            open: true,
            employee: employee,
        });
    };

    const handleRemoveUserConfirm = () => {
        if (removeUserDialog.employee) {
            router.delete(route('admin.employees.remove-user', removeUserDialog.employee.id));
        }
        setRemoveUserDialog({ open: false, employee: null });
    };

    const handleRemoveUserCancel = () => {
        setRemoveUserDialog({ open: false, employee: null });
    };

    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Format a date string as a localized date string for Indonesian locale.
     * @param {string} dateString - the date string to be formatted
     * @returns {string} the formatted date string
     */
    /*******  297b1c8b-2f66-493a-aadc-fec99c6436cb  *******/
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID');
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />

            <div className="p-6">
                {/* Flash Messages */}
                {flash.success && (
                    <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-4">
                        <p className="text-green-800">{flash.success}</p>
                    </div>
                )}
                {flash.error && (
                    <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
                        <p className="text-red-800">{flash.error}</p>
                    </div>
                )}

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
                        <p className="text-muted-foreground">Manage your employees and their user accounts</p>
                    </div>
                    <Button asChild>
                        <a href={route('admin.employees.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Employee
                        </a>
                    </Button>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Search & Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search by name, code, department, or position..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={department} onValueChange={setDepartment}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="All Departments" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Departments</SelectItem>
                                    {departments?.map((dept) => (
                                        <SelectItem key={dept} value={dept}>
                                            {dept}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button type="submit">Filter</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Users className="mr-2 h-5 w-5" />
                            Employee List
                        </CardTitle>
                        <CardDescription>
                            {employees?.data?.length > 0 ? `${employees.total} employees found` : 'No employees added yet'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {employees?.data?.length > 0 ? (
                            <div className="space-y-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Employee Code</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Department</TableHead>
                                            <TableHead>Position</TableHead>
                                            <TableHead>Hire Date</TableHead>
                                            <TableHead>User Account</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {employees.data.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell className="font-mono text-sm">{employee.employee_code}</TableCell>
                                                <TableCell className="font-medium">{employee.name}</TableCell>
                                                <TableCell>{employee.department}</TableCell>
                                                <TableCell>{employee.position}</TableCell>
                                                <TableCell>{formatDate(employee.hire_date)}</TableCell>
                                                <TableCell>
                                                    {employee.user ? (
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant={employee.user.role === 'admin' ? 'default' : 'secondary'}>
                                                                <UserCheck className="mr-1 h-3 w-3" />
                                                                {employee.user.role}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground">{employee.user.email}</span>
                                                        </div>
                                                    ) : (
                                                        <Badge variant="outline">No Account</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <a href={route('admin.employees.show', employee.id)}>
                                                                <Eye className="h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                        <Button variant="outline" size="sm" asChild>
                                                            <a href={route('admin.employees.edit', employee.id)}>
                                                                <Edit className="h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                        {employee.user ? (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleRemoveUserClick(employee)}
                                                                className="text-orange-600 hover:text-orange-700"
                                                            >
                                                                <UserMinus className="h-4 w-4" />
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                asChild
                                                                className="text-green-600 hover:text-green-700"
                                                            >
                                                                <a href={route('admin.employees.edit', employee.id)}>
                                                                    <UserPlus className="h-4 w-4" />
                                                                </a>
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDeleteClick(employee)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {/* Pagination Info */}
                                {employees.total > employees.per_page && (
                                    <div className="flex items-center justify-between pt-4">
                                        <p className="text-sm text-muted-foreground">
                                            Showing {employees.from} to {employees.to} of {employees.total} employees
                                        </p>
                                        <div className="flex gap-2">
                                            {employees.prev_page_url && (
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={employees.prev_page_url}>Previous</a>
                                                </Button>
                                            )}
                                            {employees.next_page_url && (
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={employees.next_page_url}>Next</a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
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

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && handleDeleteCancel()}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Employee</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete employee <strong>{deleteDialog.employee?.name}</strong> (Code:{' '}
                                {deleteDialog.employee?.employee_code})? This action cannot be undone.
                                {deleteDialog.employee?.user && (
                                    <span className="mt-2 block text-orange-600">
                                        Note: The associated user account will be unlinked but not deleted.
                                    </span>
                                )}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleDeleteCancel}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteConfirm}>
                                Delete Employee
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Remove User Account Dialog */}
                <Dialog open={removeUserDialog.open} onOpenChange={(open) => !open && handleRemoveUserCancel()}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Remove User Account</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to remove the user account for <strong>{removeUserDialog.employee?.name}</strong>? The employee
                                record will remain, but they will no longer be able to log in to the system.
                                <span className="mt-2 block text-red-600">This action cannot be undone.</span>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleRemoveUserCancel}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleRemoveUserConfirm}>
                                Remove User Account
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
