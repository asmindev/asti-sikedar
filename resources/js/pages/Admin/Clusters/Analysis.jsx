import AdminLayout from '@/layouts/AdminLayout';

import { Button } from '@/components/ui/button';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

        // Normalisasi data
        const normalize = (arr) => {
            const min = Math.min(...arr.flat());
            const max = Math.max(...arr.flat());
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
                employee_id: q.employee_id,
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
                    employee_id: c.employee_id,
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
        employee_id: d.employee_id,
        name: `Employee ${d.employee_id}`,
    }));

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto p-4">
                <Button onClick={handleCluster} className="mb-4">
                    Jalankan K-Means
                </Button>

                {labeledClusters.length > 0 && (
                    <>
                        <div className="mb-6 rounded-lg bg-gray-50 p-4">
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
                        </div>

                        <h2 className="mb-2 text-xl font-semibold">Hasil Clustering</h2>
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground">
                                Total Data: {labeledClusters.length} | Low: {labeledClusters.filter((c) => c.label === 'Low').length} | Medium:{' '}
                                {labeledClusters.filter((c) => c.label === 'Medium').length} | High:{' '}
                                {labeledClusters.filter((c) => c.label === 'High').length}
                            </p>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee ID</TableHead>
                                    <TableHead>Knowledge</TableHead>
                                    <TableHead>Attitude</TableHead>
                                    <TableHead>Behavior</TableHead>
                                    <TableHead>Cluster</TableHead>
                                    <TableHead>Performance</TableHead>
                                    <TableHead>Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {labeledClusters.map((res, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{res.employee_id}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">{res.avgK.toFixed(2)}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    ({questionnaires[index].k1}-{questionnaires[index].k7})
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">{res.avgA.toFixed(2)}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    ({questionnaires[index].a1}-{questionnaires[index].a7})
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">{res.avgB.toFixed(2)}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    ({questionnaires[index].b1}-{questionnaires[index].b7})
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                    res.cluster === 0
                                                        ? 'bg-red-100 text-red-800'
                                                        : res.cluster === 1
                                                          ? 'bg-yellow-100 text-yellow-800'
                                                          : 'bg-green-100 text-green-800'
                                                }`}
                                            >
                                                {res.cluster}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                    res.label === 'Low'
                                                        ? 'bg-red-100 text-red-800'
                                                        : res.label === 'Medium'
                                                          ? 'bg-yellow-100 text-yellow-800'
                                                          : 'bg-green-100 text-green-800'
                                                }`}
                                            >
                                                {res.label}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-xs">
                                                <div>
                                                    K: {questionnaires[index].k1},{questionnaires[index].k2},{questionnaires[index].k3},
                                                    {questionnaires[index].k4},{questionnaires[index].k5},{questionnaires[index].k6},
                                                    {questionnaires[index].k7}
                                                </div>
                                                <div>
                                                    A: {questionnaires[index].a1},{questionnaires[index].a2},{questionnaires[index].a3},
                                                    {questionnaires[index].a4},{questionnaires[index].a5},{questionnaires[index].a6},
                                                    {questionnaires[index].a7}
                                                </div>
                                                <div>
                                                    B: {questionnaires[index].b1},{questionnaires[index].b2},{questionnaires[index].b3},
                                                    {questionnaires[index].b4},{questionnaires[index].b5},{questionnaires[index].b6},
                                                    {questionnaires[index].b7}
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

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
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" dataKey="x" name="Knowledge" unit="" domain={[0, 5]} tick={{ fontSize: 12 }} />
                                        <YAxis type="number" dataKey="y" name="Attitude" unit="" domain={[0, 5]} tick={{ fontSize: 12 }} />
                                        <ZAxis type="number" dataKey="z" range={[0, 5]} name="Behavior" unit="" />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    formatter={(value, name) => [
                                                        value.toFixed(2),
                                                        name === 'x' ? 'Knowledge' : name === 'y' ? 'Attitude' : 'Behavior',
                                                    ]}
                                                    labelFormatter={(label, payload) => `Employee ${payload?.[0]?.payload?.employee_id || label}`}
                                                />
                                            }
                                        />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Scatter name="Low" data={chartData.filter((d) => d.label === 'Low')} fill="#EF4444" shape="circle" />
                                        <Scatter name="Medium" data={chartData.filter((d) => d.label === 'Medium')} fill="#F59E0B" shape="triangle" />
                                        <Scatter name="High" data={chartData.filter((d) => d.label === 'High')} fill="#10B981" shape="square" />
                                    </ScatterChart>
                                </ChartContainer>
                            </div>

                            <div>
                                <h3 className="mb-2 text-lg font-medium">Cluster Statistics</h3>
                                <div className="space-y-4">
                                    {['Low', 'Medium', 'High'].map((label) => {
                                        const clusterData = labeledClusters.filter((c) => c.label === label);
                                        const avgK = clusterData.reduce((sum, c) => sum + c.avgK, 0) / clusterData.length;
                                        const avgA = clusterData.reduce((sum, c) => sum + c.avgA, 0) / clusterData.length;
                                        const avgB = clusterData.reduce((sum, c) => sum + c.avgB, 0) / clusterData.length;

                                        return (
                                            <div
                                                key={label}
                                                className={`rounded-lg border p-4 ${
                                                    label === 'Low'
                                                        ? 'border-red-200 bg-red-50'
                                                        : label === 'Medium'
                                                          ? 'border-yellow-200 bg-yellow-50'
                                                          : 'border-green-200 bg-green-50'
                                                }`}
                                            >
                                                <h4
                                                    className={`text-lg font-semibold ${
                                                        label === 'Low' ? 'text-red-800' : label === 'Medium' ? 'text-yellow-800' : 'text-green-800'
                                                    }`}
                                                >
                                                    {label} Performance ({clusterData.length} employees)
                                                </h4>
                                                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                                                    <div>
                                                        <span className="font-medium">Knowledge:</span>
                                                        <br />
                                                        <span className="text-lg font-bold">{avgK.toFixed(2)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Attitude:</span>
                                                        <br />
                                                        <span className="text-lg font-bold">{avgA.toFixed(2)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Behavior:</span>
                                                        <br />
                                                        <span className="text-lg font-bold">{avgB.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {clusters && (
                    <div className="mt-6">
                        <h2 className="mb-4 text-xl font-semibold">Cluster Centroids</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {clusters.centroids.map((centroid, index) => {
                                const label = ['Low', 'Medium', 'High'][index];
                                return (
                                    <div
                                        key={index}
                                        className={`rounded-lg border p-4 ${
                                            index === 0
                                                ? 'border-red-200 bg-red-50'
                                                : index === 1
                                                  ? 'border-yellow-200 bg-yellow-50'
                                                  : 'border-green-200 bg-green-50'
                                        }`}
                                    >
                                        <h3
                                            className={`mb-2 text-lg font-semibold ${
                                                index === 0 ? 'text-red-800' : index === 1 ? 'text-yellow-800' : 'text-green-800'
                                            }`}
                                        >
                                            {label} Cluster Center
                                        </h3>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span>Knowledge:</span>
                                                <span className="font-mono">{centroid[0].toFixed(3)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Attitude:</span>
                                                <span className="font-mono">{centroid[1].toFixed(3)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Behavior:</span>
                                                <span className="font-mono">{centroid[2].toFixed(3)}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
