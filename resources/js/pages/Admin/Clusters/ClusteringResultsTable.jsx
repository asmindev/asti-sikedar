import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ClusteringResultsTable({ labeledClusters }) {
    if (!labeledClusters || labeledClusters.length === 0) {
        return null;
    }

    return (
        <>
            <h2 className="mb-2 text-xl font-semibold">Hasil Clustering</h2>
            <Card className="mb-4 rounded-lg p-0 shadow-none">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Karyawan</TableHead>
                            <TableHead>Cluster</TableHead>
                            <TableHead>Label</TableHead>
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
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300">
                                        KAB: {((res.scoreK + res.scoreA + res.scoreB) / 3).toFixed(1)}%
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
}
