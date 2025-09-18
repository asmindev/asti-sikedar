import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/AdminLayout';
import { useState } from 'react';
import { toast } from 'sonner';
import { performFullClustering } from './algoritma';
import ClusteringSummary from './ClusteringSummary';
import ClusteringResultsTable from './ClusteringResultsTable';
import DataOverview from './DataOverview';
import DatabaseStatistics from './DatabaseStatistics';
import SavedResultsTable from './SavedResultsTable';
import { saveClusterResults } from './clusterService';

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
            const result = performFullClustering(questionnaires);
            setClusters(result.clusters);
            setLabeledClusters(result.labeledClusters);
            toast.success('Clustering analysis completed successfully!');
        } catch (error) {
            toast.error('Failed to perform clustering analysis.');
            console.error('Clustering error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveResults = async () => {
        await saveClusterResults(labeledClusters, setIsSaving);
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

                {/* Database Statistics */}
                <DatabaseStatistics analysisStats={analysisStats} />

                {/* Data Overview */}
                {labeledClusters.length === 0 && (
                    <DataOverview questionnaires={questionnaires} />
                )}

                {/* Clustering Summary */}
                <ClusteringSummary labeledClusters={labeledClusters} />

                {/* Clustering Results Table */}
                <ClusteringResultsTable labeledClusters={labeledClusters} />

                {/* Saved Results Table */}
                <SavedResultsTable savedResults={savedResults} />
            </div>
        </AdminLayout>
    );
}
