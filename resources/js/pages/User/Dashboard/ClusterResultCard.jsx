import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, TrendingUp, Trophy, Target } from 'lucide-react';

const clusterConfig = {
    Low: {
        title: 'Klaster Rendah',
        icon: AlertTriangle,
        color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
        bgColor: 'bg-red-50 dark:bg-red-950',
        borderColor: 'border-red-200 dark:border-red-700',
        description: 'Anda memiliki pemahaman dasar tentang keamanan informasi yang masih perlu ditingkatkan.',
        message: 'Jangan khawatir! Dengan pelatihan yang tepat, Anda dapat meningkatkan kesadaran keamanan informasi.'
    },
    Medium: {
        title: 'Klaster Sedang',
        icon: TrendingUp,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950',
        borderColor: 'border-yellow-200 dark:border-yellow-700',
        description: 'Anda sudah memiliki pemahaman yang cukup baik tentang keamanan informasi.',
        message: 'Bagus! Dengan sedikit peningkatan konsistensi, Anda dapat mencapai level yang lebih tinggi.'
    },
    High: {
        title: 'Klaster Tinggi',
        icon: CheckCircle,
        color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
        bgColor: 'bg-green-50 dark:bg-green-950',
        borderColor: 'border-green-200 dark:border-green-700',
        description: 'Selamat! Anda memiliki tingkat kesadaran keamanan informasi yang sangat baik.',
        message: 'Excellent! Anda dapat menjadi contoh bagi rekan kerja lainnya dalam praktik keamanan informasi.'
    }
};

export default function ClusterResultCard({ clusterResult }) {
    if (!clusterResult) {
        return (
            <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-gray-500" />
                        Hasil Analisis Klaster
                    </CardTitle>
                    <CardDescription>
                        Hasil klaster akan muncul setelah data Anda dianalisis oleh admin
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Hasil analisis klaster belum tersedia</p>
                        <p className="text-xs mt-1">Silakan tunggu admin melakukan analisis data kuesioner</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const config = clusterConfig[clusterResult.label];
    const Icon = config.icon;

    return (
        <Card className={`${config.borderColor} border-2`}>
            <CardHeader className={config.bgColor}>
                <CardTitle className="flex items-center gap-3">
                    <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-gray-900 dark:text-gray-100">Hasil Analisis Klaster Anda</span>
                </CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300">
                    Berdasarkan hasil kuesioner keamanan informasi yang telah Anda isi
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Icon className="h-8 w-8" />
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {config.title}
                            </h3>
                            <Badge className={config.color}>
                                Klaster {clusterResult.cluster}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-gray-700 dark:text-gray-300">
                            {config.description}
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                            {config.message}
                        </p>
                    </div>
                </div>

                {/* Performance Indicator */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">
                        Level Keamanan Informasi
                    </h4>
                    <div className="flex justify-center">
                        <div className="w-full max-w-xs">
                            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                                <span>Rendah</span>
                                <span>Sedang</span>
                                <span>Tinggi</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full transition-all duration-300 ${
                                        clusterResult.label === 'Low' ? 'bg-red-500 w-1/3' :
                                        clusterResult.label === 'Medium' ? 'bg-yellow-500 w-2/3' :
                                        'bg-green-500 w-full'
                                    }`}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
