import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, TrendingUp, Users, BookOpen, Shield } from 'lucide-react';

const clusterConfig = {
    Low: {
        title: 'Klaster Rendah',
        icon: AlertTriangle,
        color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
        bgColor: 'bg-red-50 dark:bg-red-950/50',
        borderColor: 'border-red-200 dark:border-red-800',
        characteristics: [
            'Masih kurang memahami pentingnya keamanan informasi',
            'Sikap abai terhadap protokol keamanan',
            'Perilaku berisiko tinggi dalam penggunaan teknologi'
        ],
        recommendations: [
            'Jadwalkan pelatihan dasar keamanan informasi',
            'Buat materi edukasi visual yang mudah dipahami',
            'Lakukan monitoring intensif terhadap aktivitas digital'
        ]
    },
    Medium: {
        title: 'Klaster Sedang',
        icon: TrendingUp,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/50',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        characteristics: [
            'Sudah punya pemahaman cukup tentang keamanan informasi',
            'Sikap dan perilaku belum konsisten',
            'Memerlukan pengingat dan penguatan rutin'
        ],
        recommendations: [
            'Adakan workshop lanjutan tentang best practices',
            'Lakukan pelatihan phishing test secara berkala',
            'Berikan feedback regular tentang perilaku keamanan'
        ]
    },
    High: {
        title: 'Klaster Tinggi',
        icon: CheckCircle,
        color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
        bgColor: 'bg-green-50 dark:bg-green-950/50',
        borderColor: 'border-green-200 dark:border-green-800',
        characteristics: [
            'Pengetahuan baik tentang keamanan informasi',
            'Sikap positif dan proaktif',
            'Perilaku patuh terhadap standar keamanan informasi'
        ],
        recommendations: [
            'Libatkan sebagai mentor untuk pegawai lain',
            'Ajak membuat SOP keamanan informasi bersama',
            'Berikan peran sebagai champion keamanan informasi'
        ]
    }
};

export default function ClusterDetails({ clusterDistribution }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Detail Klaster Keamanan Informasi</h2>
            </div>

            <Tabs defaultValue="Low" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-full">
                    {Object.entries(clusterConfig).map(([level, config]) => {
                        const data = clusterDistribution[level.toLowerCase()];
                        const Icon = config.icon;

                        return (
                            <TabsTrigger
                                key={level}
                                value={level}
                                className="flex items-center gap-2 px-4 py-2"
                            >
                                <Icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{config.title}</span>
                                <Badge variant="outline" className="ml-2">
                                    {data.count}
                                </Badge>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>

                {Object.entries(clusterConfig).map(([level, config]) => {
                    const data = clusterDistribution[level.toLowerCase()];
                    const Icon = config.icon;

                    return (
                        <TabsContent key={level} value={level} className="mt-6">
                            <Card className={`${config.borderColor} border py-0 overflow-hidden`}>
                                <CardHeader className={config.bgColor + " py-4"}>
                                    <CardTitle className="flex items-center gap-3 ">
                                        <Icon className="h-6 w-6" />
                                        <span>{config.title}</span>
                                        <Badge className={config.color}>
                                            {data.count} pegawai ({data.percentage}%)
                                        </Badge>
                                    </CardTitle>
                                    <CardDescription className="text-gray-700 dark:text-gray-300">
                                        Analisis karakteristik dan rekomendasi untuk kelompok ini
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Karakteristik */}
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                <Users className="h-4 w-4" />
                                                Karakteristik
                                            </h4>
                                            <ul className="space-y-2">
                                                {config.characteristics.map((char, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                        <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                                                        {char}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Rekomendasi */}
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                <BookOpen className="h-4 w-4" />
                                                Rekomendasi
                                            </h4>
                                            <ul className="space-y-2">
                                                {config.recommendations.map((rec, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                        <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                                        {rec}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Daftar Pegawai */}
                                    {data.employees && data.employees.length > 0 && (
                                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                                Daftar Pegawai ({data.employees.length})
                                            </h4>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {data.employees.slice(0, 12).map((employee, index) => (
                                                    <Card
                                                        key={employee.id || index}
                                                        className="hover:shadow-sm dark:hover:shadow-md transition-shadow p-0"
                                                    >
                                                        <CardContent className="p-3">
                                                            <div className="font-medium text-sm text-gray-900 dark:text-white">
                                                                {employee.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {employee.department}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {employee.position}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                                {data.employees.length > 12 && (
                                                    <Card className="flex items-center justify-center p-0">
                                                        <CardContent className="p-3">
                                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                                +{data.employees.length - 12} lainnya
                                                            </span>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Empty State */}
                                    {(!data.employees || data.employees.length === 0) && (
                                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                                <Icon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                                <p className="text-sm">Belum ada pegawai dalam klaster ini</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
}
