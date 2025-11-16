import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, TrendingUp, Users, Brain, Heart, Activity } from 'lucide-react';

const clusterCharacteristics = {
    C3: {
        title: 'Karakteristik Cluster C3 (Rendah)',
        icon: AlertTriangle,
        color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
        bgColor: 'bg-red-50 dark:bg-red-950',
        borderColor: 'border-red-200 dark:border-red-700',
        characteristics: [
            {
                icon: Brain,
                aspect: 'Pengetahuan (Knowledge)',
                title: 'Pemahaman Dasar Masih Terbatas',
                description: 'Pemahaman Anda tentang keamanan informasi masih terbatas. Misalnya cara membuat password yang kuat atau mengenali email phishing.',
                iconColor: 'text-blue-500'
            },
            {
                icon: Heart,
                aspect: 'Sikap (Attitude)',
                title: 'Kesadaran Perlu Ditingkatkan',
                description: 'Anda mungkin masih kurang peduli terhadap protokol keamanan dan menganggap keamanan informasi bukan prioritas penting.',
                iconColor: 'text-pink-500'
            },
            {
                icon: Activity,
                aspect: 'Perilaku (Behavior)',
                title: 'Praktik Berisiko Tinggi',
                description: 'Terkadang Anda melakukan tindakan berisiko seperti membagikan password atau mengklik link mencurigakan tanpa verifikasi.',
                iconColor: 'text-orange-500'
            }
        ]
    },
    C2: {
        title: 'Karakteristik Cluster C2 (Sedang)',
        icon: TrendingUp,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950',
        borderColor: 'border-yellow-200 dark:border-yellow-700',
        characteristics: [
            {
                icon: Brain,
                aspect: 'Pengetahuan (Knowledge)',
                title: 'Pemahaman Cukup Baik',
                description: 'Anda sudah memiliki pemahaman cukup tentang konsep keamanan informasi, namun belum mendalam pada praktik lanjutan.',
                iconColor: 'text-blue-500'
            },
            {
                icon: Heart,
                aspect: 'Sikap (Attitude)',
                title: 'Positif Namun Belum Konsisten',
                description: 'Anda terkadang peduli dengan keamanan, tetapi belum menjadi kebiasaan yang konsisten dalam aktivitas sehari-hari.',
                iconColor: 'text-pink-500'
            },
            {
                icon: Activity,
                aspect: 'Perilaku (Behavior)',
                title: 'Sudah Mulai Menerapkan',
                description: 'Anda sudah mulai menerapkan praktik keamanan, namun masih memerlukan pengingat dan pendampingan rutin.',
                iconColor: 'text-orange-500'
            }
        ]
    },
    C1: {
        title: 'Karakteristik Cluster C1 (Tinggi)',
        icon: CheckCircle,
        color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
        bgColor: 'bg-green-50 dark:bg-green-950',
        borderColor: 'border-green-200 dark:border-green-700',
        characteristics: [
            {
                icon: Brain,
                aspect: 'Pengetahuan (Knowledge)',
                title: 'Pemahaman Sangat Baik',
                description: 'Anda memahami dengan baik berbagai aspek keamanan informasi, dari konsep dasar hingga ancaman terkini.',
                iconColor: 'text-blue-500'
            },
            {
                icon: Heart,
                aspect: 'Sikap (Attitude)',
                title: 'Proaktif dan Teladan',
                description: 'Anda aktif mempromosikan keamanan informasi dan memberi contoh baik kepada rekan kerja lainnya.',
                iconColor: 'text-pink-500'
            },
            {
                icon: Activity,
                aspect: 'Perilaku (Behavior)',
                title: 'Konsisten dan Patuh',
                description: 'Anda konsisten menerapkan standar keamanan informasi dan dapat menjadi role model bagi pegawai lain.',
                iconColor: 'text-orange-500'
            }
        ]
    }
};

export default function CharacteristicsCard({ clusterResult }) {
    if (!clusterResult) {
        return (
            <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gray-500" />
                        Karakteristik Anda
                    </CardTitle>
                    <CardDescription>
                        Karakteristik akan muncul setelah analisis klaster selesai
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Karakteristik belum tersedia</p>
                        <p className="text-xs mt-1">Silakan tunggu hasil analisis klaster</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const config = clusterCharacteristics[clusterResult.label];
    const Icon = config.icon;

    return (
        <Card className={`${config.borderColor} border-2`}>
            <CardHeader className={config.bgColor}>
                <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    <span className="text-gray-900 dark:text-gray-100">{config.title}</span>
                </CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300">
                    Profil karakteristik keamanan informasi Anda berdasarkan aspek Knowledge, Attitude, dan Behavior
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    {config.characteristics.map((char, index) => {
                        const CharIcon = char.icon;
                        return (
                            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3">
                                    <div className={`flex-shrink-0 ${char.iconColor}`}>
                                        <CharIcon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                                                {char.aspect}
                                            </h4>
                                        </div>
                                        <p className="font-medium text-sm text-gray-800 dark:text-gray-200 mb-2">
                                            {char.title}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {char.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary Badge */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Level Keamanan Informasi Anda:
                        </p>
                        <Badge className={config.color}>
                            <Icon className="h-3 w-3 mr-1" />
                            Cluster {clusterResult.label}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
