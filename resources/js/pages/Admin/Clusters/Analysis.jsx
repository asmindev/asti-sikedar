import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/AdminLayout';
import axios from 'axios';
import { kmeans } from 'ml-kmeans';
import { useState } from 'react';
import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis, ZAxis } from 'recharts';

export default function ClusterPage({ questionnaires, proposalMeta }) {
    console.log('Questionnaires:', questionnaires);
    const [clusters, setClusters] = useState(null);
    const [labeledClusters, setLabeledClusters] = useState([]);
    const breadcrumbs = [{ label: 'Dashboard', href: route('admin.dashboard') }, { label: 'Cluster Analysis' }];

    const handleCluster = () => {
        if (!questionnaires || questionnaires.length === 0) {
            alert('No data available');
            return;
        }

        // Hitung rata-rata per dimensi untuk setiap karyawan
        const data = questionnaires.map((q) => {
            const avgK = (q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7) / 7;
            const avgA = (q.a1 + q.a2 + q.a3 + q.a4 + q.a5 + q.a6 + q.a7) / 7;
            const avgB = (q.b1 + q.b2 + q.b3 + q.b4 + q.b5 + q.b6 + q.b7) / 7;
            return [avgK, avgA, avgB];
        });

        // Normalisasi data dengan pengecekan
        const normalize = (arr) => {
            const flatData = arr.flat();
            const min = Math.min(...flatData);
            const max = Math.max(...flatData);
            if (max === min) return arr.map((row) => row.map((val) => 0)); // Handle kasus semua nilai sama
            return arr.map((row) => row.map((val) => (val - min) / (max - min)));
        };
        const normalizedData = normalize(data);

        // Jalankan K-Means
        const result = kmeans(normalizedData, 3, {
            initialization: 'random',
            maxIterations: 100,
        });

        // Sort centroids berdasarkan avg skor
        const centroidsWithAvg = result.centroids.map((centroid) => {
            const avg = centroid.reduce((sum, val) => sum + val, 0) / 3;
            return { centroid, avg };
        });
        centroidsWithAvg.sort((a, b) => a.avg - b.avg);
        const clusterLabels = ['Low', 'Medium', 'High'];

        // Assign label
        const labeled = result.clusters.map((clusterIndex) => {
            const sortedIndex = centroidsWithAvg.findIndex((c) => c.centroid.every((val, i) => val === result.centroids[clusterIndex][i]));
            return clusterLabels[sortedIndex];
        });

        // Gabung dengan data asli untuk chart dan tabel
        const clusteredData = questionnaires.map((q, index) => {
            const avgK = (q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7) / 7;
            const avgA = (q.a1 + q.a2 + q.a3 + q.a4 + q.a5 + q.a6 + q.a7) / 7;
            const avgB = (q.b1 + q.b2 + q.b3 + q.b4 + q.b5 + q.b6 + q.b7) / 7;
            return {
                employee: q.employee,
                avgK,
                avgA,
                avgB,
                cluster: result.clusters[index],
                label: labeled[index],
            };
        });

        // Simpan ke cluster_results
        axios
            .post('/api/save-clusters', {
                clusters: clusteredData.map((c) => ({
                    employee: c.employee.name, // Ganti dari employee_id
                    cluster: c.cluster,
                    label: c.label,
                    score_k: c.avgK,
                    score_a: c.avgA,
                    score_b: c.avgB,
                })),
            })
            .then((response) => console.log('Clusters saved:', response.data))
            .catch((error) => console.error('Error saving clusters:', error));

        setClusters(result);
        setLabeledClusters(clusteredData);
    };

    // Data untuk chart (gunakan avgK dan avgA untuk 2D scatter, avgB sebagai Z)
    const chartData = labeledClusters.map((d, i) => ({
        x: d.avgK,
        y: d.avgA,
        z: d.avgB,
        label: d.label,
        employee: d.employee, // Ganti dari employee_id
        name: d.employee.name, // Ganti dari employee_id
    }));

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto p-4">
                {/* <p className="mb-4">Waktu Proses: 07:29 PM WITA, 05 Sep 2025</p> */}
                <p className="mb-4">
                    {/* date */}
                    {new Date().toLocaleString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        timeZone: 'Asia/Makassar',
                    })}
                </p>
                <Button onClick={handleCluster} className="mb-4">
                    Jalankan K-Means
                </Button>

                {!questionnaires || questionnaires.length === 0 && (
                    <Card className="mb-6 rounded-lg p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak Ada Data</h3>
                        <p className="text-gray-600">
                            Belum ada data kuesioner yang tersedia untuk dianalisis. Pastikan karyawan telah mengisi kuesioner terlebih dahulu.
                        </p>
                    </Card>
                )}

                {questionnaires && questionnaires.length > 0 && labeledClusters.length === 0 && (
                    <Card className="mb-6 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">Data Overview</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{questionnaires.length}</div>
                                <div className="text-sm text-gray-600">Total Questionnaires</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {questionnaires.filter(q => q.employee).length}
                                </div>
                                <div className="text-sm text-gray-600">Active Employees</div>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                            Klik tombol "Jalankan K-Means" untuk melakukan analisis clustering berdasarkan penilaian Knowledge, Attitude, dan Behavior karyawan.
                        </p>
                    </Card>
                )}

                {labeledClusters.length > 0 && (
                    <>
                        <Card className="mb-6 rounded-lg p-4">
                            <h2 className="mb-3 text-xl font-semibold">Clustering Summary</h2>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{labeledClusters.length}</div>
                                    <div className="text-sm text-gray-600">Total Employees</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {labeledClusters.filter((c) => c.label === 'High').length}
                                    </div>
                                    <div className="text-sm text-gray-600">High Performers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {labeledClusters.filter((c) => c.label === 'Medium').length}
                                    </div>
                                    <div className="text-sm text-gray-600">Medium Performers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{labeledClusters.filter((c) => c.label === 'Low').length}</div>
                                    <div className="text-sm text-gray-600">Low Performers</div>
                                </div>
                            </div>
                        </Card>

                        <h2 className="mb-2 text-xl font-semibold">Hasil Clustering</h2>
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground">
                                Total Data: {labeledClusters.length} | Low: {labeledClusters.filter((c) => c.label === 'Low').length} | Medium:{' '}
                                {labeledClusters.filter((c) => c.label === 'Medium').length} | High:{' '}
                                {labeledClusters.filter((c) => c.label === 'High').length}
                            </p>
                        </div>
                        <Card className="mb-4 rounded-lg p-0 shadow-none">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Cluster</TableHead>
                                        <TableHead>Keterangan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {labeledClusters.map((res, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell className="font-medium">{res.employee.name}</TableCell> {/* Ganti dari employee_id */}
                                            <TableCell>
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                        res.cluster === 0
                                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                            : res.cluster === 1
                                                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    }`}
                                                >
                                                    {res.cluster}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                        res.label === 'Low'
                                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                            : res.label === 'Medium'
                                                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    }`}
                                                >
                                                    {res.label}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>

                        <h2 className="mt-6 mb-2 text-xl font-semibold">Visualisasi Klaster</h2>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div>
                                <h3 className="mb-2 text-lg font-medium">3D Scatter Plot (Knowledge vs Attitude vs Behavior)</h3>
                                <ChartContainer
                                    config={{
                                        Low: {
                                            label: 'Low Performance',
                                            color: '#EF4444',
                                        },
                                        Medium: {
                                            label: 'Medium Performance',
                                            color: '#F59E0B',
                                        },
                                        High: {
                                            label: 'High Performance',
                                            color: '#10B981',
                                        },
                                    }}
                                    className="h-[400px] w-full"
                                >
                                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                        <CartesianGrid />
                                        <XAxis type="number" dataKey="x" name="Knowledge" unit="" domain={[0, 5]} tick={{ fontSize: 12 }} />
                                        <YAxis type="number" dataKey="y" name="Attitude" unit="" domain={[0, 5]} tick={{ fontSize: 12 }} />
                                        <ZAxis type="number" dataKey="z" range={[101, 100]} name="Behavior" unit="" />
                                        <ChartTooltip
                                            cursor={{ strokeDasharray: '3 3' }}
                                            content={
                                                <ChartTooltipContent
                                                    formatter={(value, name, props) => [value.toFixed(2), name]}
                                                    labelFormatter={(label, payload) => payload?.[0]?.payload?.name || label}
                                                />
                                            }
                                        />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Scatter name="Low" data={chartData.filter((d) => d.label === 'Low')} fill="#EF4444" />
                                        <Scatter name="Medium" data={chartData.filter((d) => d.label === 'Medium')} fill="#F59E0B" />
                                        <Scatter name="High" data={chartData.filter((d) => d.label === 'High')} fill="#10B981" />
                                    </ScatterChart>
                                </ChartContainer>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
