import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { BarChart3, Download, Info, Play, Settings } from 'lucide-react';

export default function ClusterAnalysis({ clusters = [], flash = {} }) {
    const breadcrumbs = [{ label: 'Dashboard', href: route('admin.dashboard') }, { label: 'Cluster Analysis' }];

    const { data, setData, post, processing, errors } = useForm({
        clusters: '3',
    });

    const handleRunAnalysis = (e) => {
        e.preventDefault();
        post(route('admin.clusters.run'));
    };

    const handleExportPdf = () => {
        window.location.href = route('admin.clusters.export-pdf');
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Cluster Analysis" />

            <div className="p-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Cluster Analysis</h1>
                    <p className="text-sm text-muted-foreground">Run K-Means clustering analysis on questionnaire data</p>
                </div>

                {flash.success && (
                    <Alert className="mb-4">
                        <Info className="h-4 w-4" />
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-lg">
                                <Settings className="mr-2 h-4 w-4" />
                                Cluster Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-4">
                                <form onSubmit={handleRunAnalysis}>
                                    <div className="flex items-end gap-3">
                                        <div className="flex-1">
                                            <Label htmlFor="clusters" className="text-sm">
                                                Number of Clusters
                                            </Label>
                                            <Input
                                                id="clusters"
                                                type="number"
                                                min="2"
                                                max="10"
                                                value={data.clusters}
                                                onChange={(e) => setData('clusters', e.target.value)}
                                                className="mt-1 h-8"
                                                placeholder="2-10"
                                            />
                                            {errors.clusters && <p className="mt-1 text-xs text-red-600">{errors.clusters}</p>}
                                        </div>
                                        <Button type="submit" disabled={processing || !data.clusters} className="h-8" size="sm">
                                            <Play className="mr-2 h-3 w-3" />
                                            {processing ? 'Running...' : 'Run'}
                                        </Button>
                                    </div>
                                </form>

                                <div className="border-t pt-4">
                                    <h4 className="mb-3 flex items-center text-sm font-medium">
                                        <BarChart3 className="mr-2 h-4 w-4" />
                                        Results
                                    </h4>
                                    {clusters && clusters.length > 0 ? (
                                        <div className="space-y-3">
                                            <div className="rounded bg-green-50 p-2">
                                                <div className="flex items-center justify-between text-xs text-green-700">
                                                    <span>
                                                        <strong>Clusters:</strong> {clusters.length}
                                                    </span>
                                                    <span>
                                                        <strong>Status:</strong> Complete
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                {clusters.map((cluster, index) => (
                                                    <div key={index} className="flex items-center justify-between rounded bg-gray-50 p-2">
                                                        <span className="text-xs">Cluster {index + 1}</span>
                                                        <span className="text-xs font-medium">{cluster.members || 0} members</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <Button onClick={handleExportPdf} variant="outline" className="h-8 w-full" size="sm">
                                                <Download className="mr-2 h-3 w-3" />
                                                Export Results
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="py-6 text-center">
                                            <BarChart3 className="mx-auto h-8 w-8 text-muted-foreground" />
                                            <h3 className="mt-2 text-sm font-semibold">No Results</h3>
                                            <p className="mt-1 text-xs text-muted-foreground">Run analysis to see clustering results</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
