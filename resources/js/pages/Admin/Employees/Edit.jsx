import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Save, UserCheck } from 'lucide-react';
import { useState } from 'react';

export default function EmployeeEdit({ employee }) {
    const { flash } = usePage().props;
    const breadcrumbs = [
        { label: 'Dashboard', href: route('admin.dashboard') },
        { label: 'Employee Management', href: route('admin.employees.index') },
        { label: `Edit ${employee.name}` },
    ];

    const [createUserAccount, setCreateUserAccount] = useState(!!employee.user);

    const { data, setData, put, processing, errors } = useForm({
        employee_code: employee.employee_code || '',
        name: employee.name || '',
        department: employee.department || '',
        position: employee.position || '',
        hire_date: employee.hire_date ? new Date(employee.hire_date).toISOString().split('T')[0] : '',
        phone: employee.phone || '',
        address: employee.address || '',
        create_user_account: !!employee.user,
        email: employee.user?.email || '',
        password: '',
        password_confirmation: '',
        role: employee.user?.role || 'user',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', data);
        console.log('Email value:', data.email);
        console.log('Create user account:', data.create_user_account);
        put(route('admin.employees.update', employee.id), {
            onSuccess: () => {
                console.log('Update successful');
            },
            onError: (errors) => {
                console.log('Update errors:', errors);
            },
        });
    };

    const toggleUserAccount = (checked) => {
        setCreateUserAccount(checked);
        setData((prevData) => ({
            ...prevData,
            create_user_account: checked,
            // Reset user fields if unchecked and no existing user
            ...(!checked &&
                !employee.user && {
                    email: '',
                    password: '',
                    password_confirmation: '',
                    role: 'user',
                }),
            // Keep existing email if user exists and checkbox is unchecked
            ...(!checked &&
                employee.user && {
                    email: employee.user.email,
                }),
        }));
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Employee - ${employee.name}`} />

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
                        <h1 className="text-3xl font-bold tracking-tight">Edit Employee</h1>
                        <p className="text-muted-foreground">Update employee information and manage user account</p>
                    </div>
                    <Button variant="outline" asChild>
                        <a href={route('admin.employees.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to List
                        </a>
                    </Button>
                </div>

                <div className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Employee Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Employee Information</CardTitle>
                                <CardDescription>Update the employee's personal and professional details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Employee Code */}
                                    <div className="space-y-2">
                                        <Label htmlFor="employee_code">
                                            Employee Code <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="employee_code"
                                            type="text"
                                            value={data.employee_code}
                                            onChange={(e) => setData('employee_code', e.target.value)}
                                            placeholder="e.g., EMP001"
                                            className={errors.employee_code ? 'border-red-500' : ''}
                                        />
                                        {errors.employee_code && <p className="text-sm text-red-500">{errors.employee_code}</p>}
                                    </div>

                                    {/* Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Full Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Employee full name"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    {/* Department */}
                                    <div className="space-y-2">
                                        <Label htmlFor="department">
                                            Department <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="department"
                                            type="text"
                                            value={data.department}
                                            onChange={(e) => setData('department', e.target.value)}
                                            placeholder="e.g., Human Resources"
                                            className={errors.department ? 'border-red-500' : ''}
                                        />
                                        {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
                                    </div>

                                    {/* Position */}
                                    <div className="space-y-2">
                                        <Label htmlFor="position">
                                            Position <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="position"
                                            type="text"
                                            value={data.position}
                                            onChange={(e) => setData('position', e.target.value)}
                                            placeholder="e.g., HR Manager"
                                            className={errors.position ? 'border-red-500' : ''}
                                        />
                                        {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
                                    </div>

                                    {/* Hire Date */}
                                    <div className="space-y-2">
                                        <Label htmlFor="hire_date">
                                            Hire Date <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="hire_date"
                                            type="date"
                                            value={data.hire_date}
                                            onChange={(e) => setData('hire_date', e.target.value)}
                                            className={errors.hire_date ? 'border-red-500' : ''}
                                        />
                                        {errors.hire_date && <p className="text-sm text-red-500">{errors.hire_date}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="e.g., +62 812 3456 7890"
                                            className={errors.phone ? 'border-red-500' : ''}
                                        />
                                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="mt-6 space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        rows={3}
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Employee address"
                                        className={errors.address ? 'border-red-500' : ''}
                                    />
                                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* User Account Section */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <Checkbox id="create_user_account" checked={createUserAccount} onCheckedChange={toggleUserAccount} />
                                    <div>
                                        <CardTitle className="flex items-center text-lg">
                                            {employee.user && <UserCheck className="mr-2 h-5 w-5 text-green-600" />}
                                            {employee.user ? 'Update User Account' : 'Create User Account'}
                                        </CardTitle>
                                        <CardDescription>
                                            {employee.user
                                                ? 'Manage the existing user account for this employee'
                                                : 'Check this option to create a user account that allows the employee to log in to the system'}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            {createUserAccount && (
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* Email */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email">
                                                Email Address <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="user@example.com"
                                                className={errors.email ? 'border-red-500' : ''}
                                            />
                                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                        </div>

                                        {/* Role */}
                                        <div className="space-y-2">
                                            <Label htmlFor="role">
                                                Role <span className="text-red-500">*</span>
                                            </Label>
                                            <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                                <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="Select role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="user">User</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-2">
                                            <Label htmlFor="password">
                                                Password {!employee.user && <span className="text-red-500">*</span>}
                                                {employee.user && (
                                                    <span className="text-sm text-muted-foreground">(leave blank to keep current)</span>
                                                )}
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder={employee.user ? 'Enter new password (optional)' : 'Minimum 8 characters'}
                                                className={errors.password ? 'border-red-500' : ''}
                                            />
                                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                        </div>

                                        {/* Password Confirmation */}
                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation">
                                                Confirm Password {!employee.user && <span className="text-red-500">*</span>}
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="Repeat password"
                                                className={errors.password_confirmation ? 'border-red-500' : ''}
                                            />
                                            {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-4 border-t pt-6">
                            <Button type="button" variant="outline" asChild>
                                <a href={route('admin.employees.index')}>Cancel</a>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
