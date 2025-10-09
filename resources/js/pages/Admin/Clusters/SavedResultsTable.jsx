import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SavedResultsTable({ savedResults }) {
    if (!savedResults || savedResults.length === 0) {
        return null;
    }

    return (
        <>
            <h2 className="mt-6 mb-2 text-xl font-semibold">Data Tersimpan di Database</h2>
            <Card className="mb-6 rounded-lg p-0 shadow-none">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Karyawan</TableHead>
                            <TableHead>Kluster</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Skor KAB</TableHead>
                            <TableHead>Tanggal Update</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {savedResults.map((result, index) => (
                            <TableRow key={result.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{result.employee?.name || 'N/A'}</TableCell>
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
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300">
                                        KAB: {((parseFloat(result.score_k || 0) + parseFloat(result.score_a || 0) + parseFloat(result.score_b || 0)) / 3).toFixed(1)}%
                                    </span>
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
    );
}
