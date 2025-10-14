import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ClusteringResultsTable({ labeledClusters }) {
    if (!labeledClusters || labeledClusters.length === 0) {
        return null;
    }

    // Buat mapping dari cluster number ke label untuk mengurutkan jarak
    const clusterToLabel = {};
    labeledClusters.forEach(item => {
        if (!clusterToLabel[item.cluster]) {
            clusterToLabel[item.cluster] = item.label;
        }
    });

    // Buat array mapping [cluster, label] dan urutkan berdasarkan label (C3, C2, C1)
    const labelOrder = { 'C3': 0, 'C2': 1, 'C1': 2 };
    const sortedClusters = Object.entries(clusterToLabel)
        .sort(([, labelA], [, labelB]) => labelOrder[labelA] - labelOrder[labelB])
        .map(([cluster]) => parseInt(cluster));

    // sortedClusters sekarang berisi [clusterC3, clusterC2, clusterC1]
    // Misal: [2, 0, 1] berarti cluster 2=C3, cluster 0=C2, cluster 1=C1

    return (
        <>
            <h2 className="mb-2 text-xl font-semibold">Hasil Clustering</h2>
            <Card className="mb-4 rounded-lg p-0 shadow-none">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Karyawan</TableHead>
                            <TableHead>Nilai (total KAB)</TableHead>
                            <TableHead>Jarak ke C3</TableHead>
                            <TableHead>Jarak ke C2</TableHead>
                            <TableHead>Jarak ke C1</TableHead>
                            <TableHead>Cluster</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {labeledClusters.map((res, index) => {
                            // scoreK, scoreA, scoreB sudah dalam skala 1-7
                            const avgKAB = ((res.scoreK + res.scoreA + res.scoreB) / 3).toFixed(2);

                            // Array jarak [distanceToC0, distanceToC1, distanceToC2]
                            const distances = [res.distanceToC1, res.distanceToC2, res.distanceToC3];

                            // Mapping jarak ke label yang sesuai
                            // sortedClusters[0] = cluster dengan label C3
                            // sortedClusters[1] = cluster dengan label C2
                            // sortedClusters[2] = cluster dengan label C1
                            const distanceToC3 = distances[sortedClusters[0]];
                            const distanceToC2 = distances[sortedClusters[1]];
                            const distanceToC1 = distances[sortedClusters[2]];

                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{res.employee.name}</TableCell>
                                    <TableCell>{avgKAB}</TableCell>
                                    <TableCell>{distanceToC3?.toFixed(2) || 'N/A'}</TableCell>
                                    <TableCell>{distanceToC2?.toFixed(2) || 'N/A'}</TableCell>
                                    <TableCell>{distanceToC1?.toFixed(2) || 'N/A'}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            res.label === 'C3' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300' :
                                            res.label === 'C2' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300' :
                                            'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300'
                                        }`}>
                                            {res.label}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
}
