import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/AdminLayout';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { performFullClustering } from './algoritma';
import ClusteringSummary from './ClusteringSummary';
import ClusteringResultsTable from './ClusteringResultsTable';
import DataOverview from './DataOverview';
import DatabaseStatistics from './DatabaseStatistics';
import SavedResultsTable from './SavedResultsTable';
import { saveClusterResults } from './clusterService';
import { FileSpreadsheet, Settings, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Combobox } from '@/components/ui/combobox';

export default function ClusterPage({ questionnaires, analysisStats, savedResults }) {
    const [clusters, setClusters] = useState(null);
    const [labeledClusters, setLabeledClusters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [centroidMode, setCentroidMode] = useState('auto'); // 'auto' or 'respondent'
    const [selectedRespondents, setSelectedRespondents] = useState({
        low: '',
        medium: '',
        high: '',
    });
    const breadcrumbs = [{ label: 'Dashboard', href: route('admin.dashboard') }, { label: 'Analisis Cluster' }];

    // Hitung rata-rata KAB untuk setiap responden (skala 1-7)
    const respondentsWithAvg = useMemo(() => {
        if (!questionnaires || questionnaires.length === 0) return [];

        return questionnaires.map((q) => {
            const totalK = q.k1 + q.k2 + q.k3 + q.k4 + q.k5 + q.k6 + q.k7;
            const totalA = q.a1 + q.a2 + q.a3 + q.a4 + q.a5 + q.a6 + q.a7;
            const totalB = q.b1 + q.b2 + q.b3 + q.b4 + q.b5 + q.b6 + q.b7;
            const scoreK = totalK / 7; // Rata-rata dari 7 pertanyaan (skala 1-7)
            const scoreA = totalA / 7;
            const scoreB = totalB / 7;
            const avgScore = (scoreK + scoreA + scoreB) / 3;

            return {
                ...q,
                scoreK,
                scoreA,
                scoreB,
                avgScore,
            };
        }).sort((a, b) => b.avgScore - a.avgScore); // Sort by avgScore descending
    }, [questionnaires]);

    const handleCluster = () => {
        if (!questionnaires || questionnaires.length === 0) {
            toast.error('Tidak ada data kuesioner yang tersedia untuk pengelompokan.');
            return;
        }

        setIsLoading(true);

        try {
            let centroids = null;

            // Mode Respondent: Pilih dari data responden
            if (centroidMode === 'respondent') {
                const { low, medium, high } = selectedRespondents;

                if (!low || !medium || !high) {
                    toast.error('Harap pilih 3 responden sebagai centroid.');
                    setIsLoading(false);
                    return;
                }

                // Cari data responden yang dipilih
                const lowResp = respondentsWithAvg.find(r => r.id === parseInt(low));
                const mediumResp = respondentsWithAvg.find(r => r.id === parseInt(medium));
                const highResp = respondentsWithAvg.find(r => r.id === parseInt(high));

                if (!lowResp || !mediumResp || !highResp) {
                    toast.error('Responden yang dipilih tidak valid.');
                    setIsLoading(false);
                    return;
                }

                centroids = [
                    [lowResp.scoreK, lowResp.scoreA, lowResp.scoreB],
                    [mediumResp.scoreK, mediumResp.scoreA, mediumResp.scoreB],
                    [highResp.scoreK, highResp.scoreA, highResp.scoreB],
                ];

                console.log('👥 Centroid dari responden:', {
                    low: `${lowResp.employee?.name} (${lowResp.avgScore.toFixed(2)})`,
                    medium: `${mediumResp.employee?.name} (${mediumResp.avgScore.toFixed(2)})`,
                    high: `${highResp.employee?.name} (${highResp.avgScore.toFixed(2)})`,
                });
                console.log('📍 Centroid values:', centroids);
            }

            const result = performFullClustering(questionnaires, centroids);
            setClusters(result.clusters);
            setLabeledClusters(result.labeledClusters);
            toast.success('Analisis pengelompokan berhasil diselesaikan!');
        } catch (error) {
            toast.error('Gagal melakukan analisis pengelompokan.');
            console.error('Clustering error:', error);
        } finally {
            setIsLoading(false);
        }
    };    const handleSaveResults = async () => {
        await saveClusterResults(labeledClusters, setIsSaving);
    };

    const handleExportExcel = () => {
        if (!savedResults || savedResults.length === 0) {
            toast.error('Tidak ada data cluster yang tersimpan untuk diekspor.');
            return;
        }

        // Redirect to export route
        window.location.href = route('admin.clusters.export-excel');
        toast.success('Mengunduh file Excel...');
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

                            <Button
                                onClick={handleExportExcel}
                                variant="secondary"
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                <FileSpreadsheet className="mr-2 h-4 w-4" />
                                Export Excel
                            </Button>

                        <Button onClick={handleCluster} disabled={isLoading}>
                            {isLoading ? 'Memproses...' : 'Jalankan K-Means'}
                        </Button>
                        {labeledClusters.length > 0 && (
                            <Button
                                onClick={handleSaveResults}
                                disabled={isSaving}
                                variant="outline"
                            >
                                {isSaving ? 'Menyimpan...' : 'Simpan ke Database'}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Database Statistics */}
                <DatabaseStatistics analysisStats={analysisStats} />

                {/* Centroid Configuration */}
                <Card className="mb-6 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold">Pengaturan Centroid</h3>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={centroidMode === 'auto' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCentroidMode('auto')}
                            >
                                Auto (K-means++)
                            </Button>
                            <Button
                                variant={centroidMode === 'respondent' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCentroidMode('respondent')}
                            >
                                <User className="mr-1 h-4 w-4" />
                                Pilih Responden
                            </Button>
                        </div>
                    </div>

                    {/* Mode Auto */}
                    {centroidMode === 'auto' && (
                        <div className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                            <strong>Mode Auto (K-means++):</strong> Menggunakan inisialisasi otomatis untuk menentukan centroid awal secara optimal.
                            <br />
                            <span className="text-xs text-gray-600">
                                Normalisasi menggunakan range data aktual untuk hasil clustering yang optimal.
                            </span>
                        </div>
                    )}
                    {/* Mode Respondent */}
                    {centroidMode === 'respondent' && (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Pilih 3 responden dari daftar di bawah untuk dijadikan centroid awal:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* C3 Centroid */}
                                <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
                                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-300">
                                        Centroid C3
                                    </h4>
                                    <Combobox
                                        value={selectedRespondents.low}
                                        onValueChange={(value) => setSelectedRespondents({...selectedRespondents, low: value})}
                                        options={respondentsWithAvg.map((resp) => ({
                                            value: resp.id.toString(),
                                            label: `${resp.employee?.name} - Avg: ${resp.avgScore.toFixed(2)}`
                                        }))}
                                        placeholder="Pilih responden..."
                                        searchPlaceholder="Cari nama responden..."
                                        emptyText="Responden tidak ditemukan."
                                    />
                                    {selectedRespondents.low && (() => {
                                        const resp = respondentsWithAvg.find(r => r.id === parseInt(selectedRespondents.low));
                                        return resp && (
                                            <div className="mt-2 text-xs text-gray-600">
                                                <div>K: {resp.scoreK.toFixed(2)}</div>
                                                <div>A: {resp.scoreA.toFixed(2)}</div>
                                                <div>B: {resp.scoreB.toFixed(2)}</div>
                                            </div>
                                        );
                                    })()}
                                </div>

                                {/* C2 Centroid */}
                                <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
                                    <h4 className="font-semibold mb-3 text-yellow-700 dark:text-yellow-300">
                                        Centroid C2
                                    </h4>
                                    <Combobox
                                        value={selectedRespondents.medium}
                                        onValueChange={(value) => setSelectedRespondents({...selectedRespondents, medium: value})}
                                        options={respondentsWithAvg.map((resp) => ({
                                            value: resp.id.toString(),
                                            label: `${resp.employee?.name} - Avg: ${resp.avgScore.toFixed(2)}`
                                        }))}
                                        placeholder="Pilih responden..."
                                        searchPlaceholder="Cari nama responden..."
                                        emptyText="Responden tidak ditemukan."
                                    />
                                    {selectedRespondents.medium && (() => {
                                        const resp = respondentsWithAvg.find(r => r.id === parseInt(selectedRespondents.medium));
                                        return resp && (
                                            <div className="mt-2 text-xs text-gray-600">
                                                <div>K: {resp.scoreK.toFixed(2)}</div>
                                                <div>A: {resp.scoreA.toFixed(2)}</div>
                                                <div>B: {resp.scoreB.toFixed(2)}</div>
                                            </div>
                                        );
                                    })()}
                                </div>

                                {/* C1 Centroid */}
                                <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                                    <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300">
                                        Centroid C1
                                    </h4>
                                    <Combobox
                                        value={selectedRespondents.high}
                                        onValueChange={(value) => setSelectedRespondents({...selectedRespondents, high: value})}
                                        options={respondentsWithAvg.map((resp) => ({
                                            value: resp.id.toString(),
                                            label: `${resp.employee?.name} - Avg: ${resp.avgScore.toFixed(2)}`
                                        }))}
                                        placeholder="Pilih responden..."
                                        searchPlaceholder="Cari nama responden..."
                                        emptyText="Responden tidak ditemukan."
                                    />
                                    {selectedRespondents.high && (() => {
                                        const resp = respondentsWithAvg.find(r => r.id === parseInt(selectedRespondents.high));
                                        return resp && (
                                            <div className="mt-2 text-xs text-gray-600">
                                                <div>K: {resp.scoreK.toFixed(2)}</div>
                                                <div>A: {resp.scoreA.toFixed(2)}</div>
                                                <div>B: {resp.scoreB.toFixed(2)}</div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>

                            <div className="text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded space-y-2">
                                <div className="flex items-start gap-2">
                                    <span className="text-lg">💡</span>
                                    <div>
                                        <strong>Mode Responden:</strong> Menggunakan data aktual dari responden sebagai centroid.
                                        <br />
                                        <strong>Tips:</strong> Pilih responden dengan skor rendah, sedang, dan tinggi untuk hasil optimal.
                                        <br />
                                        <span className="text-xs text-gray-600">
                                            Daftar diurutkan dari skor tertinggi ke terendah.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Data Overview */}
                {labeledClusters.length === 0 && (
                    <DataOverview questionnaires={questionnaires} />
                )}

                {/* Clustering Summary */}
                <ClusteringSummary labeledClusters={labeledClusters} />

                {/* Clustering Results Table */}
                <ClusteringResultsTable labeledClusters={labeledClusters} />

                {/* Saved Results Table - Hanya tampil jika BELUM ada hasil clustering baru */}
                {labeledClusters.length === 0 && (
                    <SavedResultsTable savedResults={savedResults} />
                )}
            </div>
        </AdminLayout>
    );
}
