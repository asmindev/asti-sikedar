import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/AdminLayout';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ClusterDistributionChart from '@/components/dashboard/ClusterDistributionChart';
import ClusterDetails from '@/components/dashboard/ClusterDetails';
import QuickActions from '@/components/dashboard/QuickActions';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({ user, stats, clusterDistribution }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="p-6 space-y-6">
                <div className="relative bg-cover bg-center bg-no-repeat bg-[url('/images/kejatii.jpg')] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 p-6 space-y-4">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                Dashboard Admin
                            </h1>
                            <p className="text-white/90 mt-1">
                                Selamat datang kembali, {user.name}! Berikut ringkasan sistem keamanan informasi.
                            </p>
                        </div>

                        {/* Stats Overview */}
                        <StatsOverview stats={stats} clusterDistribution={clusterDistribution} />
                    </div>
                </div>


                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Chart Section - 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Chart */}
                        <ClusterDistributionChart
                            clusterDistribution={clusterDistribution}
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
