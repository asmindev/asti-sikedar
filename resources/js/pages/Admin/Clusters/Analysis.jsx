import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/AdminLayout';
import axios from 'axios';
import { kmeans } from 'ml-kmeans';
import { useState } from 'react';
import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis, ZAxis } from 'recharts';
import { toast } from 'sonner';

export default function ClusterPage({ questionnaires, analysisStats, savedResults }) {
    const [clusters, setClusters] = useState(null);
    const [labeledClusters, setLabeledClusters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const breadcrumbs = [{ label: 'Dashboard', href: route('admin.dashboard') }, { label: 'Cluster Analysis' }];

    const handleCluster = () => {
        if (!questionnaires || questionnaires.length === 0) {
            toast.error('No questionnaire data available for clustering.');
            return;
        }

        setIsLoading(true);

        try {
            // Hitung skor Knowledge, Attitude, Behavior
            const data = questionnaires.map((q) => {
                const totalK = q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7;
                const totalA = q.a1 + q.a2 + q.a3 + q.a4 + q.a5 + q.a6 + q.a7;
                const totalB = q.b1 + q.b2 + q.b3 + q.b4 + q.b5 + q.b6 + q.b7;
                const scoreK = (totalK / 35) * 100;
                const scoreA = (totalA / 35) * 100;
                const scoreB = (totalB / 35) * 100;
                return [scoreK, scoreA, scoreB];
            });

            // Normalisasi
            const normalize = (arr) => {
                const flat = arr.flat();
                const min = Math.min(...flat);
                const max = Math.max(...flat);
                if (max === min) return arr.map(row => row.map(() => 0));
                return arr.map(row => row.map(v => (v - min) / (max - min)));
            };
            const normalizedData = normalize(data);

            // K-Means
            const result = kmeans(normalizedData, 3, {
                initialization: 'kmeans++',
                maxIterations: 100,
                seed: 42,
            });

            // Gabungkan hasil
            const clusteredData = questionnaires.map((q, i) => {
                const totalK = q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7;
                const totalA = q.a1 + q.a2 + q.a3 + q.a4 + q.a5 + q.a6 + q.a7;
                const totalB = q.b1 + q.b2 + q.b3 + q.b4 + q.b5 + q.b6 + q.b7;
                const scoreK = (totalK / 35) * 100;
                const scoreA = (totalA / 35) * 100;
                const scoreB = (totalB / 35) * 100;
                const avgScore = (scoreK + scoreA + scoreB) / 3;
                return {
                    employee: q.employee,
                    scoreK,
                    scoreA,
                    scoreB,
                    cluster: result.clusters[i],
                    avgScore,
                };
            });

            // Label langsung berdasarkan cluster
            const clusterToLabel = {
                0: 'Low',
                1: 'Medium',
                2: 'High',
            };

            const finalData = clusteredData.map(item => ({
                ...item,
                label: clusterToLabel[item.cluster],
            }));

            setClusters(result);
            setLabeledClusters(finalData);
            toast.success('Clustering analysis completed successfully!');
        } catch (error) {
            toast.error('Failed to perform clustering analysis.');
            console.error('Clustering error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveResults = async () => {
        if (!labeledClusters || labeledClusters.length === 0) {
            toast.error('No clustering results to save.');
            return;
        }

        setIsSaving(true);

        try {
            const results = labeledClusters.map(item => ({
                employee_id: item.employee.id,
                cluster: item.cluster,
                label: item.label,
                score_k: item.scoreK,
                score_a: item.scoreA,
                score_b: item.scoreB,
            }));

            const response = await axios.post(route('admin.clusters.store'), {
                results: results
            });

            toast.success(`Successfully saved ${response.data.saved_count} cluster results to database!`);
        } catch (error) {
            toast.error('Failed to save cluster results to database.');
            console.error('Save error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    // Data untuk chart
    const chartData = labeledClusters.map(d => ({
        x: d.scoreK,
        y: d.scoreA,
        z: d.scoreB,
        label: d.label,
        employee: d.employee,
        name: d.employee.name,
    }));

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-500">
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
                        {analysisStats?.lastAnalysisDate && (
                            <div className="text-sm text-gray-600 bg-blue-50 dark:bg-blue-900 px-3 py-1 rounded-full">
                                Analisis terakhir: {new Date(analysisStats.lastAnalysisDate).toLocaleString('id-ID', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleCluster} disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Jalankan K-Means'}
                        </Button>
                        {labeledClusters.length > 0 && (
                            <Button
                                onClick={handleSaveResults}
                                disabled={isSaving}
                                variant="outline"
                            >
                                {isSaving ? 'Saving...' : 'Save to Database'}
                            </Button>
                        )}
                    </div>
                </div>

                {!questionnaires || questionnaires.length === 0 && (
                    <Card className="mb-6 rounded-lg p-8 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak Ada Data</h3>
                        <p className="text-gray-600">Belum ada data kuesioner yang tersedia untuk dianalisis.</p>
                    </Card>
                )}

                {/* Database Statistics */}
                {analysisStats && analysisStats.totalSavedResults > 0 && (
                    <Card className="mb-6 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                        <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
                            Database Statistics
                        </h3>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{analysisStats.totalSavedResults}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Data Tersimpan</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {analysisStats.clusterDistribution?.high || 0}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">High Level</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {analysisStats.clusterDistribution?.medium || 0}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Medium Level</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-600">
                                    {analysisStats.clusterDistribution?.low || 0}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Low Level</div>
                            </div>
                        </div>
                        {analysisStats.lastAnalysisDate && (
                            <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                                <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
                                    Terakhir diperbarui: {new Date(analysisStats.lastAnalysisDate).toLocaleString('id-ID', {
                                        weekday: 'long',
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        )}
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
                                        {labeledClusters.filter(c => c.label === 'High').length}
                                    </div>
                                    <div className="text-sm text-gray-600">High Performers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {labeledClusters.filter(c => c.label === 'Medium').length}
                                    </div>
                                    <div className="text-sm text-gray-600">Medium Performers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">
                                        {labeledClusters.filter(c => c.label === 'Low').length}
                                    </div>
                                    <div className="text-sm text-gray-600">Low Performers</div>
                                </div>
                            </div>
                        </Card>

                        <h2 className="mb-2 text-xl font-semibold">Hasil Clustering</h2>
                        <Card className="mb-4 rounded-lg p-0 shadow-none">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Cluster</TableHead>
                                        <TableHead>Label</TableHead>
                                        {/* tampilkan skor KAB-nya */}
                                        <TableHead>Skor KAB</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {labeledClusters.map((res, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{res.employee.name}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    res.cluster === 0 ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300' :
                                                    res.cluster === 1 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300' :
                                                    'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300'
                                                }`}>
                                                    {res.cluster}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    res.label === 'Low' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300' :
                                                    res.label === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300' :
                                                    'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300'
                                                }`}>
                                                    {res.label}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-xs space-y-1">
                                                    <div className="flex justify-between">
                                                        <span className="text-blue-600 font-medium">Knowledge:</span>
                                                        <span>{res.scoreK.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-green-600 font-medium">Attitude:</span>
                                                        <span>{res.scoreA.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-purple-600 font-medium">Behavior:</span>
                                                        <span>{res.scoreB.toFixed(1)}%</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>

                        {/* <h2 className="mt-6 mb-2 text-xl font-semibold">Visualisasi Klaster</h2>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div>
                                <h3 className="mb-2 text-lg font-medium">3D Scatter Plot (Knowledge vs Attitude vs Behavior)</h3>
                                <ChartContainer
                                    config={{
                                        Low: { label: 'Low Performance', color: '#EF4444' },
                                        Medium: { label: 'Medium Performance', color: '#F59E0B' },
                                        High: { label: 'High Performance', color: '#10B981' },
                                    }}
                                    className="h-[400px] w-full"
                                >
                                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                        <CartesianGrid />
                                        <XAxis type="number" dataKey="x" name="Knowledge" unit="%" domain={[0, 100]} />
                                        <YAxis type="number" dataKey="y" name="Attitude" unit="%" domain={[0, 100]} />
                                        <ZAxis type="number" dataKey="z" range={[50, 200]} name="Behavior" unit="%" />
                                        <ChartTooltip
                                            cursor={{ strokeDasharray: '3 3' }}
                                            content={<ChartTooltipContent
                                                formatter={(value) => [value.toFixed(2)]}
                                                labelFormatter={(label, payload) => payload?.[0]?.payload?.name}
                                            />}
                                        />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Scatter name="Low" data={chartData.filter(d => d.label === 'Low')} fill="#EF4444" />
                                        <Scatter name="Medium" data={chartData.filter(d => d.label === 'Medium')} fill="#F59E0B" />
                                        <Scatter name="High" data={chartData.filter(d => d.label === 'High')} fill="#10B981" />
                                    </ScatterChart>
                                </ChartContainer>
                            </div>
                        </div> */}
                    </>
                )}

                {/* Saved Results Table */}
                {savedResults && savedResults.length > 0 && (
                    <>
                        <h2 className="mt-6 mb-2 text-xl font-semibold">Data Tersimpan di Database</h2>
                        <Card className="mb-6 rounded-lg p-0 shadow-none">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>NIP</TableHead>
                                        <TableHead>Cluster</TableHead>
                                        <TableHead>Label</TableHead>
                                        <TableHead>Skor KAB</TableHead>
                                        <TableHead>Tanggal Update</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {savedResults.map((result, index) => (
                                        <TableRow key={result.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-medium">{result.employee?.name || 'N/A'}</TableCell>
                                            <TableCell className="text-sm text-gray-600">{result.employee?.nip || 'N/A'}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    result.cluster === 0 ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300' :
                                                    result.cluster === 1 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300' :
                                                    'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300'
                                                }`}>
                                                    {result.cluster}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    result.label === 'Low' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300' :
                                                    result.label === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300' :
                                                    'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300'
                                                }`}>
                                                    {result.label}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-xs space-y-1">
                                                    <div className="flex justify-between gap-2">
                                                        <span className="text-blue-600 font-medium">K:</span>
                                                        <span>{parseFloat(result.score_k || 0).toFixed(1)}%</span>
                                                    </div>
                                                    <div className="flex justify-between gap-2">
                                                        <span className="text-green-600 font-medium">A:</span>
                                                        <span>{parseFloat(result.score_a || 0).toFixed(1)}%</span>
                                                    </div>
                                                    <div className="flex justify-between gap-2">
                                                        <span className="text-purple-600 font-medium">B:</span>
                                                        <span>{parseFloat(result.score_b || 0).toFixed(1)}%</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-500">
                                                {new Date(result.updated_at).toLocaleString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
