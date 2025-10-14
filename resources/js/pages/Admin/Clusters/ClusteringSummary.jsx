import { Card } from '@/components/ui/card';

export default function ClusteringSummary({ labeledClusters }) {
    if (!labeledClusters || labeledClusters.length === 0) {
        return null;
    }

    return (
        <Card className="mb-6 rounded-lg p-4">
            <h2 className="mb-3 text-xl font-semibold">Ringkasan Clustering</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
            </div>
        </Card>
    );
}
