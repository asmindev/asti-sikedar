import { Card } from '@/components/ui/card';

export default function DatabaseStatistics({ analysisStats }) {
    if (!analysisStats || analysisStats.totalSavedResults === 0) {
        return null;
    }

    return (
        <Card className="mb-6 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
                Statistik Database
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
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tingkat Tinggi</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                        {analysisStats.clusterDistribution?.medium || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tingkat Sedang</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                        {analysisStats.clusterDistribution?.low || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tingkat Rendah</div>
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
    );
}
