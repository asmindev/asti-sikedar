import { Card } from '@/components/ui/card';
import { IterationCw, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ClusteringSummary({ labeledClusters, iterations, converged }) {
    if (!labeledClusters || labeledClusters.length === 0) {
        return null;
    }

    return (
        <Card className="mb-6 rounded-lg p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Ringkasan Clustering</h2>
                {/* {converged !== null && (
                    <Badge variant={converged ? "default" : "destructive"} className="flex items-center gap-1">
                        {converged ? (
                            <>
                                <CheckCircle2 className="h-4 w-4" />
                                Konvergen
                            </>
                        ) : (
                            <>
                                <XCircle className="h-4 w-4" />
                                Tidak Konvergen
                            </>
                        )}
                    </Badge>
                )} */}
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{labeledClusters.length}</div>
                    <div className="text-sm text-gray-600">Total Karyawan</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                        {labeledClusters.filter(c => c.label === 'C1').length}
                    </div>
                    <div className="text-sm text-gray-600">Cluster C1 (Tinggi)</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                        {labeledClusters.filter(c => c.label === 'C2').length}
                    </div>
                    <div className="text-sm text-gray-600">Cluster C2 (Sedang)</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                        {labeledClusters.filter(c => c.label === 'C3').length}
                    </div>
                    <div className="text-sm text-gray-600">Cluster C3 (Rendah)</div>
                </div>
                {iterations !== null && (
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 flex items-center justify-center gap-1">
                            <IterationCw className="h-6 w-6" />
                            {iterations}
                        </div>
                        <div className="text-sm text-gray-600">Total Iterasi</div>
                    </div>
                )}
            </div>

            {converged !== null && !converged && (
                <div className="mt-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ <strong>Perhatian:</strong> Algoritma mencapai batas maksimum iterasi (100) tanpa konvergen.
                        Hasil clustering mungkin tidak optimal. Pertimbangkan untuk menggunakan centroid manual yang lebih baik.
                    </p>
                </div>
            )}
        </Card>
    );
}
