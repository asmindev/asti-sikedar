import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, TrendingUp, Users, BookOpen, Shield } from 'lucide-react';

const clusterConfig = {
    Low: {
        title: 'Klaster Rendah',
        icon: AlertTriangle,
        color: 'bg-red-100 text-red-800 border-red-200',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
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
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
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
        color: 'bg-green-100 text-green-800 border-green-200',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
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
                <Shield className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Detail Klaster Keamanan Informasi</h2>
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
                                    <CardDescription className="text-gray-700">
                                        Analisis karakteristik dan rekomendasi untuk kelompok ini
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Karakteristik */}
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <Users className="h-4 w-4" />
                                                Karakteristik
                                            </h4>
                                            <ul className="space-y-2">
                                                {config.characteristics.map((char, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                                        {char}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Rekomendasi */}
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <BookOpen className="h-4 w-4" />
                                                Rekomendasi
                                            </h4>
                                            <ul className="space-y-2">
                                                {config.recommendations.map((rec, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                        {rec}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Daftar Pegawai */}
                                    {data.employees && data.employees.length > 0 && (
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <h4 className="font-semibold text-gray-900 mb-3">
                                                Daftar Pegawai ({data.employees.length})
                                            </h4>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {data.employees.slice(0, 12).map((employee, index) => (
                                                    <div
                                                        key={employee.id || index}
                                                        className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                                                    >
                                                        <div className="font-medium text-sm text-gray-900">
                                                            {employee.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {employee.department}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {employee.position}
                                                        </div>
                                                    </div>
                                                ))}
                                                {data.employees.length > 12 && (
                                                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                                                        <span className="text-sm text-gray-600">
                                                            +{data.employees.length - 12} lainnya
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Empty State */}
                                    {(!data.employees || data.employees.length === 0) && (
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <div className="text-center py-8 text-gray-500">
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
