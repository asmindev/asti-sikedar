import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserLayout from '@/layouts/UserLayout';
import { Head } from '@inertiajs/react';
import { BarChart3, Eye, User } from 'lucide-react';

export default function UserDashboard({ user }) {
    return (
        <UserLayout>
            <Head title="User Dashboard" />

            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {user.name}!</p>
                </div>

                <div className="mb-8 grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Profile Status</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">Complete</div>
                            <p className="text-xs text-muted-foreground">Profile information is up to date</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Cluster Results</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">No results available yet</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Today</div>
                            <p className="text-xs text-muted-foreground">Logged in successfully</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Manage your profile and view results</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button asChild className="w-full justify-start">
                                <a href={route('user.profile')}>
                                    <User className="mr-2 h-4 w-4" />
                                    Update Profile
                                </a>
                            </Button>
                            <Button asChild variant="outline" className="w-full justify-start">
                                <a href={route('user.results')}>
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    View Cluster Results
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Information</CardTitle>
                            <CardDescription>Your account details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">Name:</span>
                                <span className="text-sm">{user.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">Email:</span>
                                <span className="text-sm">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">Role:</span>
                                <span className="text-sm capitalize">{user.role}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </UserLayout>
    );
}
