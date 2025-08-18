import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, UserPlus } from 'lucide-react';

export default function EmployeeCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        department: '',
        position: '',
        phone: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.employees.store'));
    };
    const breadcrumbs = [
        { label: 'Dashboard', href: route('admin.dashboard') },
        { label: 'Employees', href: route('admin.employees.index') },
        { label: 'Add Employee' },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Employee" />

            <div className="container mx-auto w-full space-y-8 p-6">
                {/* Header Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="outline" size="icon" className="h-9 w-9">
                            <Link href={route('admin.employees.index')}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">Add New Employee</h1>
                            <p className="text-sm text-muted-foreground">Create a new employee record in the system</p>
                        </div>
                    </div>
                    <Separator />
                </div>

                {/* Form Section */}
                <Card className="shadow-sm">
                    <CardHeader className="space-y-3">
                        <CardTitle className="flex items-center text-lg font-semibold">
                            <UserPlus className="mr-2 h-5 w-5 text-primary" />
                            Employee Information
                        </CardTitle>
                        <CardDescription className="text-sm">Please fill in all required fields to create a new employee record</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="mb-3 text-sm font-medium text-foreground">Personal Details</h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-medium">
                                                Full Name <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Enter full name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className={`transition-all duration-200 ${
                                                    errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:ring-primary'
                                                }`}
                                                required
                                            />
                                            {errors.name && (
                                                <p className="flex items-center gap-1 text-xs text-red-600">
                                                    <span className="inline-block h-1 w-1 rounded-full bg-red-600"></span>
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium">
                                                Email Address <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Enter email address"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className={`transition-all duration-200 ${
                                                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:ring-primary'
                                                }`}
                                                required
                                            />
                                            {errors.email && (
                                                <p className="flex items-center gap-1 text-xs text-red-600">
                                                    <span className="inline-block h-1 w-1 rounded-full bg-red-600"></span>
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Work Information */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="mb-3 text-sm font-medium text-foreground">Work Details</h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="department" className="text-sm font-medium">
                                                Department <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="department"
                                                type="text"
                                                placeholder="Enter department"
                                                value={data.department}
                                                onChange={(e) => setData('department', e.target.value)}
                                                className={`transition-all duration-200 ${
                                                    errors.department
                                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                        : 'focus:ring-primary'
                                                }`}
                                                required
                                            />
                                            {errors.department && (
                                                <p className="flex items-center gap-1 text-xs text-red-600">
                                                    <span className="inline-block h-1 w-1 rounded-full bg-red-600"></span>
                                                    {errors.department}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="position" className="text-sm font-medium">
                                                Position <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="position"
                                                type="text"
                                                placeholder="Enter position/job title"
                                                value={data.position}
                                                onChange={(e) => setData('position', e.target.value)}
                                                className={`transition-all duration-200 ${
                                                    errors.position ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:ring-primary'
                                                }`}
                                                required
                                            />
                                            {errors.position && (
                                                <p className="flex items-center gap-1 text-xs text-red-600">
                                                    <span className="inline-block h-1 w-1 rounded-full bg-red-600"></span>
                                                    {errors.position}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="mb-3 text-sm font-medium text-foreground">Contact Information</h3>
                                    <div className="max-w-md">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-sm font-medium">
                                                Phone Number
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="Enter phone number"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className={`transition-all duration-200 ${
                                                    errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:ring-primary'
                                                }`}
                                            />
                                            {errors.phone && (
                                                <p className="flex items-center gap-1 text-xs text-red-600">
                                                    <span className="inline-block h-1 w-1 rounded-full bg-red-600"></span>
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between border-t pt-6">
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-red-500">*</span> Required fields
                                </p>
                                <div className="flex gap-3">
                                    <Button asChild type="button" variant="outline" className="min-w-[100px]">
                                        <Link href={route('admin.employees.index')}>Cancel</Link>
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="min-w-[140px] bg-primary hover:bg-primary/90 focus:ring-primary"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Create Employee
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
