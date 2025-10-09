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

    // Buat array mapping [cluster, label] dan urutkan berdasarkan label (Low, Medium, High)
    const labelOrder = { 'Low': 0, 'Medium': 1, 'High': 2 };
    const sortedClusters = Object.entries(clusterToLabel)
        .sort(([, labelA], [, labelB]) => labelOrder[labelA] - labelOrder[labelB])
        .map(([cluster]) => parseInt(cluster));

    // sortedClusters sekarang berisi [clusterLow, clusterMedium, clusterHigh]
    // Misal: [2, 0, 1] berarti cluster 2=Low, cluster 0=Medium, cluster 1=High

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
                            <TableHead>Jarak ke Low</TableHead>
                            <TableHead>Jarak ke Medium</TableHead>
                            <TableHead>Jarak ke High</TableHead>
                            <TableHead>Klaster (Kategori)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {labeledClusters.map((res, index) => {
                            // Hitung rata-rata KAB dalam skala 1-5 (bukan persentase)
                            // scoreK, scoreA, scoreB sudah dalam bentuk persentase (0-100)
                            // Konversi kembali ke skala 1-5: nilai_persen / 100 * 5
                            const avgKAB = (((res.scoreK + res.scoreA + res.scoreB) / 3) / 100 * 5).toFixed(1);

                            // Array jarak [distanceToC0, distanceToC1, distanceToC2]
                            const distances = [res.distanceToC1, res.distanceToC2, res.distanceToC3];

                            // Mapping jarak ke label yang sesuai
                            // sortedClusters[0] = cluster dengan label Low
                            // sortedClusters[1] = cluster dengan label Medium
                            // sortedClusters[2] = cluster dengan label High
                            const distanceToLow = distances[sortedClusters[0]];
                            const distanceToMedium = distances[sortedClusters[1]];
                            const distanceToHigh = distances[sortedClusters[2]];

                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{res.employee.name}</TableCell>
                                    <TableCell>{avgKAB}</TableCell>
                                    <TableCell>{distanceToLow?.toFixed(2) || 'N/A'}</TableCell>
                                    <TableCell>{distanceToMedium?.toFixed(2) || 'N/A'}</TableCell>
                                    <TableCell>{distanceToHigh?.toFixed(2) || 'N/A'}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            res.label === 'Low' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300' :
                                            res.label === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300' :
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
