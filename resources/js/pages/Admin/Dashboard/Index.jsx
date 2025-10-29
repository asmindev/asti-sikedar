import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/layouts/AdminLayout';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ClusterDistributionChart from '@/components/dashboard/ClusterDistributionChart';
import ClusterDetails from '@/components/dashboard/ClusterDetails';
import BreakdownChart from '@/components/dashboard/BreakdownChart';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({ user, stats, clusterDistribution, genderBreakdown, ageBreakdown, educationBreakdown, departmentBreakdown }) {
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


                {/* Main Content - Cluster Distribution with Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Distribusi Klaster Pegawai</CardTitle>
                        <CardDescription>
                            Lihat distribusi cluster secara keseluruhan dan berdasarkan berbagai kategori
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-5">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="gender">Jenis Kelamin</TabsTrigger>
                                <TabsTrigger value="age">Usia</TabsTrigger>
                                <TabsTrigger value="education">Pendidikan</TabsTrigger>
                                <TabsTrigger value="department">Bagian</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="mt-6">
                                <ClusterDistributionChart
                                    clusterDistribution={clusterDistribution}
                                />
                            </TabsContent>
                            <TabsContent value="gender" className="mt-6">
                                <BreakdownChart
                                    data={genderBreakdown}
                                    type="gender"
                                    title="Distribusi Cluster Berdasarkan Jenis Kelamin"
                                />
                            </TabsContent>
                            <TabsContent value="age" className="mt-6">
                                <BreakdownChart
                                    data={ageBreakdown}
                                    type="age"
                                    title="Distribusi Cluster Berdasarkan Kelompok Usia"
                                />
                            </TabsContent>
                            <TabsContent value="education" className="mt-6">
                                <BreakdownChart
                                    data={educationBreakdown}
                                    type="education"
                                    title="Distribusi Cluster Berdasarkan Tingkat Pendidikan"
                                />
                            </TabsContent>
                            <TabsContent value="department" className="mt-6">
                                <BreakdownChart
                                    data={departmentBreakdown}
                                    type="department"
                                    title="Distribusi Cluster Berdasarkan Bagian"
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Cluster Details */}
                <ClusterDetails clusterDistribution={clusterDistribution} />
            </div>
        </AdminLayout>
    );
}
