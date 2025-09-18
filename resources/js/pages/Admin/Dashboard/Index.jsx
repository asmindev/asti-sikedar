import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/AdminLayout';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ClusterDistributionChart from '@/components/dashboard/ClusterDistributionChart';
import ClusterDetails from '@/components/dashboard/ClusterDetails';
import QuickActions from '@/components/dashboard/QuickActions';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { BarChart, PieChart } from 'lucide-react';

export default function AdminDashboard({ user, stats, clusterDistribution }) {
    const [chartType, setChartType] = useState('pie');

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Dashboard Admin
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Selamat datang kembali, {user.name}! Berikut ringkasan sistem keamanan informasi.
                    </p>
                </div>

                {/* Stats Overview */}
                <StatsOverview stats={stats} clusterDistribution={clusterDistribution} />

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Chart Section - 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Chart Controls */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Visualisasi Klaster
                            </h2>
                            <div className="flex gap-2">
                                <Button
                                    variant={chartType === 'pie' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setChartType('pie')}
                                    className="flex items-center gap-2"
                                >
                                    <PieChart className="h-4 w-4" />
                                    Pie Chart
                                </Button>
                                <Button
                                    variant={chartType === 'bar' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setChartType('bar')}
                                    className="flex items-center gap-2"
                                >
                                    <BarChart className="h-4 w-4" />
                                    Bar Chart
                                </Button>
                            </div>
                        </div>

                        {/* Chart */}
                        <ClusterDistributionChart
                            clusterDistribution={clusterDistribution}
                            chartType={chartType}
                        />
                    </div>

                    {/* Quick Actions - 1 column */}
                    <div>
                        <QuickActions />
                    </div>
                </div>

                {/* Cluster Details */}
                <ClusterDetails clusterDistribution={clusterDistribution} />
            </div>
        </AdminLayout>
    );
}
