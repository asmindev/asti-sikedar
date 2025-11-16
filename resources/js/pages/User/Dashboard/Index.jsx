import UserLayout from '@/layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileText } from 'lucide-react';
import ClusterResultCard from './ClusterResultCard';
import KABScoreCard from './KABScoreCard';
import PersonalRecommendations from './PersonalRecommendations';
import CharacteristicsCard from './CharacteristicsCard';

export default function Index({ auth, clusterResult, questionnaire }) {
    const breadcrumbs = [
        { label: 'Dashboard', href: route('user.dashboard') }
    ];

    return (
        <UserLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Pegawai" />

            <div className="p-6 space-y-6">
                {/* Welcome Section */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">
                                    Selamat datang, {auth.user.name}!
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Dashboard personal untuk monitoring awareness keamanan informasi Anda
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date().toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Status Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">
                                    Status Kuesioner
                                </h4>
                                <p className="text-blue-800 dark:text-blue-200 font-semibold">
                                    {questionnaire ? 'Sudah Diselesaikan' : 'Belum Diselesaikan'}
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                <h4 className="font-medium text-green-900 dark:text-green-100 text-sm">
                                    Status Analisis
                                </h4>
                                <p className="text-green-800 dark:text-green-200 font-semibold">
                                    {clusterResult ? 'Tersedia' : 'Menunggu Proses'}
                                </p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                                <h4 className="font-medium text-purple-900 dark:text-purple-100 text-sm">
                                    Cluster Level
                                </h4>
                                <p className="text-purple-800 dark:text-purple-200 font-semibold">
                                    {clusterResult ? `Cluster ${clusterResult.cluster}` : 'Belum Tersedia'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quiz Alert - Show when questionnaire not completed */}
                {!questionnaire && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-6 w-6 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">
                                    Kuesioner Belum Diselesaikan
                                </h4>
                                <p className="text-orange-800 dark:text-orange-200 mb-4">
                                    Untuk mendapatkan analisis awareness keamanan informasi dan rekomendasi personal,
                                    silakan lengkapi kuesioner assessment terlebih dahulu.
                                </p>
                                <Button asChild className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600">
                                    <Link href={route('user.quiz')}>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Isi Kuesioner Sekarang
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dashboard Content Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="cluster">Hasil Cluster</TabsTrigger>
                        <TabsTrigger value="characteristics">Karakteristik</TabsTrigger>
                        <TabsTrigger value="scores">Skor KAB</TabsTrigger>
                        <TabsTrigger value="recommendations">Rekomendasi</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6 mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ClusterResultCard
                                clusterResult={clusterResult}
                                questionnaire={questionnaire}
                            />
                            <CharacteristicsCard
                                clusterResult={clusterResult}
                            />
                        </div>
                        <KABScoreCard
                            clusterResult={clusterResult}
                            questionnaire={questionnaire}
                        />
                    </TabsContent>

                    <TabsContent value="cluster" className="mt-6">
                        <ClusterResultCard
                            clusterResult={clusterResult}
                            questionnaire={questionnaire}
                        />
                    </TabsContent>

                    <TabsContent value="characteristics" className="mt-6">
                        <CharacteristicsCard
                            clusterResult={clusterResult}
                        />
                    </TabsContent>

                    <TabsContent value="scores" className="mt-6">
                        <KABScoreCard
                            clusterResult={clusterResult}
                            questionnaire={questionnaire}
                        />
                    </TabsContent>

                    <TabsContent value="recommendations" className="mt-6">
                        <PersonalRecommendations
                            clusterResult={clusterResult}
                            questionnaire={questionnaire}
                        />
                    </TabsContent>
                </Tabs>

                {/* Additional Information */}
                {!clusterResult && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                                    Informasi Penting
                                </h4>
                                <div className="text-yellow-800 dark:text-yellow-200 space-y-2">
                                    <p>
                                        Untuk mendapatkan analisis cluster dan rekomendasi personal, pastikan Anda telah:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>Menyelesaikan kuesioner assessment keamanan informasi</li>
                                        <li>Menunggu admin melakukan proses analisis clustering</li>
                                        <li>Hasil akan otomatis muncul di dashboard setelah proses selesai</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
