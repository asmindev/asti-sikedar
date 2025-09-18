import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Lightbulb,
    BookOpen,
    Shield,
    AlertTriangle,
    CheckCircle,
    Clock
} from 'lucide-react';

export default function PersonalRecommendations({ clusterResult, questionnaire }) {
    const getRecommendationsByCluster = (cluster) => {
        const clusterRecommendations = {
            0: { // Low Awareness
                title: 'Rekomendasi untuk Peningkatan Kesadaran',
                priority: 'high',
                color: 'red',
                icon: AlertTriangle,
                recommendations: [
                    {
                        type: 'training',
                        title: 'Workshop Dasar Keamanan Informasi',
                        description: 'Ikuti pelatihan dasar keamanan informasi yang diadakan oleh IT Security team setiap bulan',
                        priority: 'Tinggi',
                        timeframe: '1-2 minggu'
                    },
                    {
                        type: 'reading',
                        title: 'Panduan Keamanan Password',
                        description: 'Pelajari cara membuat dan mengelola password yang kuat untuk semua akun digital',
                        priority: 'Tinggi',
                        timeframe: '1 hari'
                    },
                    {
                        type: 'practice',
                        title: 'Aktivasi 2FA pada Akun Penting',
                        description: 'Aktifkan two-factor authentication pada email, sistem internal, dan aplikasi penting lainnya',
                        priority: 'Sedang',
                        timeframe: '3 hari'
                    },
                    {
                        type: 'awareness',
                        title: 'Quiz Keamanan Mingguan',
                        description: 'Ikuti quiz keamanan informasi mingguan untuk meningkatkan awareness',
                        priority: 'Sedang',
                        timeframe: 'Mingguan'
                    }
                ]
            },
            1: { // Medium Awareness
                title: 'Rekomendasi untuk Penguatan Praktik',
                priority: 'medium',
                color: 'yellow',
                icon: Shield,
                recommendations: [
                    {
                        type: 'advanced_training',
                        title: 'Workshop Lanjutan Cyber Security',
                        description: 'Tingkatkan skill dengan mengikuti workshop advanced cyber security dan threat detection',
                        priority: 'Sedang',
                        timeframe: '2-3 minggu'
                    },
                    {
                        type: 'practice',
                        title: 'Implementasi Security Tools',
                        description: 'Gunakan security tools seperti password manager dan VPN untuk keamanan maksimal',
                        priority: 'Sedang',
                        timeframe: '1 minggu'
                    },
                    {
                        type: 'sharing',
                        title: 'Berbagi Pengetahuan',
                        description: 'Bantu rekan kerja yang masih membutuhkan peningkatan awareness keamanan',
                        priority: 'Rendah',
                        timeframe: 'Berkelanjutan'
                    },
                    {
                        type: 'update',
                        title: 'Update Berkala Knowledge',
                        description: 'Ikuti webinar bulanan tentang trend dan threat terbaru di dunia cyber security',
                        priority: 'Sedang',
                        timeframe: 'Bulanan'
                    }
                ]
            },
            2: { // High Awareness
                title: 'Rekomendasi untuk Ekspertise Lanjutan',
                priority: 'low',
                color: 'green',
                icon: CheckCircle,
                recommendations: [
                    {
                        type: 'leadership',
                        title: 'Menjadi Security Champion',
                        description: 'Bergabung dengan tim Security Champion untuk membantu meningkatkan awareness di divisi',
                        priority: 'Sedang',
                        timeframe: '1 bulan'
                    },
                    {
                        type: 'certification',
                        title: 'Sertifikasi Cyber Security',
                        description: 'Ambil sertifikasi profesional seperti CISSP, CISM, atau CompTIA Security+',
                        priority: 'Rendah',
                        timeframe: '6-12 bulan'
                    },
                    {
                        type: 'contribution',
                        title: 'Kontribusi Policy Security',
                        description: 'Berpartisipasi dalam review dan pengembangan kebijakan keamanan organisasi',
                        priority: 'Rendah',
                        timeframe: 'Berkelanjutan'
                    },
                    {
                        type: 'innovation',
                        title: 'Penelitian Security Innovation',
                        description: 'Lakukan penelitian atau project inovasi untuk meningkatkan security posture organisasi',
                        priority: 'Rendah',
                        timeframe: '3-6 bulan'
                    }
                ]
            }
        };

        return clusterRecommendations[cluster] || clusterRecommendations[1];
    };

    const getGeneralRecommendations = () => {
        return [
            {
                type: 'daily',
                title: 'Praktik Harian',
                items: [
                    'Verifikasi email sender sebelum membuka attachment',
                    'Gunakan password unik untuk setiap akun',
                    'Logout dari aplikasi setelah selesai bekerja',
                    'Update software dan aplikasi secara berkala'
                ]
            },
            {
                type: 'weekly',
                title: 'Praktik Mingguan',
                items: [
                    'Review dan update password lemah',
                    'Backup data penting',
                    'Check security update pada device',
                    'Clear browser cache dan cookies'
                ]
            },
            {
                type: 'monthly',
                title: 'Praktik Bulanan',
                items: [
                    'Review akses dan permission account',
                    'Update security awareness knowledge',
                    'Audit personal device security',
                    'Evaluasi penggunaan aplikasi dan tools'
                ]
            }
        ];
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'Tinggi': return <AlertTriangle className="h-4 w-4 text-red-500" />;
            case 'Sedang': return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'Rendah': return <CheckCircle className="h-4 w-4 text-green-500" />;
            default: return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Tinggi': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'Sedang': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'Rendah': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    if (!clusterResult) {
        return (
            <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        Rekomendasi Personal
                    </CardTitle>
                    <CardDescription>
                        Rekomendasi akan tersedia setelah analisis klaster selesai
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Rekomendasi personal belum tersedia</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const clusterData = getRecommendationsByCluster(clusterResult.cluster);
    const generalData = getGeneralRecommendations();
    const ClusterIcon = clusterData.icon;

    return (
        <div className="space-y-6">
            {/* Cluster-specific Recommendations */}
            <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ClusterIcon className={`h-5 w-5 text-${clusterData.color}-500`} />
                        {clusterData.title}
                    </CardTitle>
                    <CardDescription>
                        Rekomendasi khusus berdasarkan level awareness keamanan informasi Anda
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {clusterData.recommendations.map((rec, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            {rec.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            {rec.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        {getPriorityIcon(rec.priority)}
                                        <Badge className={getPriorityColor(rec.priority)}>
                                            {rec.priority}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {rec.timeframe}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* General Best Practices */}
            {/* <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        Praktik Terbaik Keamanan Informasi
                    </CardTitle>
                    <CardDescription>
                        Panduan praktik keamanan yang perlu diterapkan secara konsisten
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                        {generalData.map((category, index) => (
                            <div key={index} className="space-y-3">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                                    {category.title}
                                </h4>
                                <ul className="space-y-2">
                                    {category.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card> */}
        </div>
    );
}
