import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { ArrowLeft, BarChart3, Calendar, Edit, FileText, Mail, MapPin, Phone, User, UserCheck } from 'lucide-react';

export default function EmployeeShow({ employee }) {
    const breadcrumbs = [
        { label: 'Dashboard', href: route('admin.dashboard') },
        { label: 'Employee Management', href: route('admin.employees.index') },
        { label: employee.name },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Employee - ${employee.name}`} />

            <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{employee.name}</h1>
                        <p className="text-muted-foreground">Employee Details</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <a href={route('admin.employees.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to List
                            </a>
                        </Button>
                        <Button asChild>
                            <a href={route('admin.employees.edit', employee.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Employee
                            </a>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Basic Information */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Employee Code</p>
                                    <p className="font-mono text-lg">{employee.employee_code}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                    <p className="text-lg font-medium">{employee.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Department</p>
                                    <p className="text-lg">{employee.department}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Position</p>
                                    <p className="text-lg">{employee.position}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Hire Date</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-lg">
                                            {new Date(employee.hire_date).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                                {employee.phone && (
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <p className="text-lg">{employee.phone}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {employee.address && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                                    <div className="mt-1 flex items-start gap-2">
                                        <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                                        <p className="text-lg">{employee.address}</p>
                                    </div>
                                </div>
                            )}

                            <Separator />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Created</p>
                                    <p className="text-sm">
                                        {new Date(employee.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                    <p className="text-sm">
                                        {new Date(employee.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Account & Status Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <UserCheck className="mr-2 h-5 w-5" />
                                User Account & Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div>
                                    <p className="mb-2 text-sm font-medium text-muted-foreground">User Account</p>
                                    {employee.user ? (
                                        <div className="space-y-2">
                                            <Badge
                                                variant={employee.user.role === 'admin' ? 'default' : 'secondary'}
                                                className="w-full justify-center"
                                            >
                                                {employee.user.role} Account
                                            </Badge>
                                            <div className="flex items-center justify-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm text-muted-foreground">{employee.user.email}</p>
                                            </div>
                                            <p className="text-center text-xs text-muted-foreground">
                                                Created: {new Date(employee.user.created_at).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    ) : (
                                        <Badge variant="outline" className="w-full justify-center">
                                            No User Account
                                        </Badge>
                                    )}
                                </div>

                                <Separator />

                                <div>
                                    <p className="mb-2 text-sm font-medium text-muted-foreground">Survey Status</p>
                                    <Badge variant={employee.questionnaire ? 'success' : 'destructive'} className="w-full justify-center">
                                        {employee.questionnaire ? 'Completed' : 'Pending'}
                                    </Badge>
                                    {employee.questionnaire && (
                                        <p className="mt-1 text-center text-xs text-muted-foreground">
                                            Completed: {new Date(employee.questionnaire.created_at).toLocaleDateString('id-ID')}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <p className="mb-2 text-sm font-medium text-muted-foreground">Clustering Status</p>
                                    <Badge variant={employee.cluster_result ? 'default' : 'outline'} className="w-full justify-center">
                                        {employee.cluster_result ? 'Analyzed' : 'Not Analyzed'}
                                    </Badge>
                                    {employee.cluster_result && (
                                        <p className="mt-1 text-center text-xs text-muted-foreground">
                                            Cluster: {employee.cluster_result.cluster_id}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Questionnaire Details */}
                    {employee.questionnaire && (
                        <Card className="md:col-span-2 lg:col-span-3">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileText className="mr-2 h-5 w-5" />
                                    Questionnaire Responses
                                </CardTitle>
                                <CardDescription>
                                    Survey completed on{' '}
                                    {new Date(employee.questionnaire.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-3">
                                    {/* K Questions */}
                                    <div>
                                        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Knowledge Questions</h4>
                                        <div className="grid grid-cols-4 gap-2 text-sm">
                                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                                <div key={`k${num}`} className="text-center">
                                                    <p className="font-mono text-xs text-muted-foreground">K{num}</p>
                                                    <p className="font-medium">{employee.questionnaire[`k${num}`]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* A Questions */}
                                    <div>
                                        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Attitude Questions</h4>
                                        <div className="grid grid-cols-4 gap-2 text-sm">
                                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                                <div key={`a${num}`} className="text-center">
                                                    <p className="font-mono text-xs text-muted-foreground">A{num}</p>
                                                    <p className="font-medium">{employee.questionnaire[`a${num}`]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* B Questions */}
                                    <div>
                                        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Behavior Questions</h4>
                                        <div className="grid grid-cols-4 gap-2 text-sm">
                                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                                <div key={`b${num}`} className="text-center">
                                                    <p className="font-mono text-xs text-muted-foreground">B{num}</p>
                                                    <p className="font-medium">{employee.questionnaire[`b${num}`]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Cluster Results */}
                    {employee.cluster_result && (
                        <Card className="md:col-span-2 lg:col-span-3">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <BarChart3 className="mr-2 h-5 w-5" />
                                    Cluster Analysis Results
                                </CardTitle>
                                <CardDescription>
                                    Analysis performed on{' '}
                                    {new Date(employee.cluster_result.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-primary">{employee.cluster_result.cluster_id}</p>
                                        <p className="text-sm text-muted-foreground">Cluster ID</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{employee.cluster_result.knowledge_score}</p>
                                        <p className="text-sm text-muted-foreground">Knowledge Score</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{employee.cluster_result.attitude_score}</p>
                                        <p className="text-sm text-muted-foreground">Attitude Score</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{employee.cluster_result.behavior_score}</p>
                                        <p className="text-sm text-muted-foreground">Behavior Score</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
