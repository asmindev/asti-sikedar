import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import UserLayout from '@/layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';
import { BarChart3, Calendar, Download, Eye, FileText, AlertCircle, CheckCircle, Brain, Heart, Activity } from 'lucide-react';

export default function UserResults({ user, employee, questionnaire, hasCompletedQuiz, results }) {
    const getScoreColor = (score) => {
        if (score >= 4.5) return 'text-green-600';
        if (score >= 3.5) return 'text-blue-600';
        if (score >= 2.5) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreLevel = (score) => {
        if (score >= 4.5) return 'Sangat Baik';
        if (score >= 3.5) return 'Baik';
        if (score >= 2.5) return 'Cukup';
        return 'Perlu Peningkatan';
    };

    return (
        <UserLayout>
            <Head title="Hasil Saya" />

            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Hasil Kuis Saya</h1>
                    <p className="text-muted-foreground">Lihat hasil penilaian kesadaran keamanan siber Anda</p>
                </div>

                {!hasCompletedQuiz ? (
                    <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                        <CardContent className="py-12 text-center">
                            <AlertCircle className="mx-auto h-12 w-12 text-orange-600 dark:text-orange-400" />
                            <h3 className="mt-4 text-lg font-semibold text-orange-800 dark:text-orange-200">Kuis Belum Diselesaikan</h3>
                            <p className="mt-2 text-orange-700 dark:text-orange-300">
                                Anda belum menyelesaikan kuis kesadaran keamanan siber.
                            </p>
                            <div className="mt-6">
                                <Button asChild className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600">
                                    <Link href={route('user.quiz')}>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Kerjakan Kuis Sekarang
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {/* Overall Summary */}
                        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        <CardTitle className="text-green-800 dark:text-green-200">Kuis Berhasil Diselesaikan</CardTitle>
                                    </div>
                                    <Badge className="bg-green-600 dark:bg-green-500">Selesai</Badge>
                                </div>
                                <CardDescription className="text-green-700 dark:text-green-300">
                                    Terima kasih telah menyelesaikan penilaian kesadaran keamanan siber.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                                            {results ? results.overall_score.toFixed(1) : 'N/A'}
                                        </div>
                                        <p className="text-sm text-green-600 dark:text-green-400">Skor Keseluruhan</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-700 dark:text-green-300">21</div>
                                        <p className="text-sm text-green-600 dark:text-green-400">Pertanyaan Dijawab</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-700 dark:text-green-300">3</div>
                                        <p className="text-sm text-green-600 dark:text-green-400">Aspek Dinilai</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                                            {questionnaire ? new Date(questionnaire.created_at).toLocaleDateString() : 'N/A'}
                                        </div>
                                        <p className="text-sm text-green-600 dark:text-green-400">Diselesaikan Pada</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Detailed Scores */}
                        {results && (
                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Knowledge Score */}
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <Brain className="h-5 w-5 text-blue-600" />
                                            <CardTitle>Knowledge (Pengetahuan)</CardTitle>
                                        </div>
                                        <CardDescription>
                                            Pemahaman tentang konsep dan risiko keamanan siber
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium">Score</span>
                                                    <span className={`text-sm font-bold ${getScoreColor(results.knowledge_score)}`}>
                                                        {results.knowledge_score.toFixed(1)}/5.0
                                                    </span>
                                                </div>
                                                <Progress value={(results.knowledge_score / 5) * 100} className="h-2" />
                                            </div>
                                            <div className="text-center">
                                                <Badge variant="outline" className={getScoreColor(results.knowledge_score)}>
                                                    {getScoreLevel(results.knowledge_score)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Attitude Score */}
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <Heart className="h-5 w-5 text-red-600" />
                                            <CardTitle>Attitude (Sikap)</CardTitle>
                                        </div>
                                        <CardDescription>
                                            Pola pikir dan keyakinan tentang praktik keamanan siber
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium">Score</span>
                                                    <span className={`text-sm font-bold ${getScoreColor(results.attitude_score)}`}>
                                                        {results.attitude_score.toFixed(1)}/5.0
                                                    </span>
                                                </div>
                                                <Progress value={(results.attitude_score / 5) * 100} className="h-2" />
                                            </div>
                                            <div className="text-center">
                                                <Badge variant="outline" className={getScoreColor(results.attitude_score)}>
                                                    {getScoreLevel(results.attitude_score)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Behavior Score */}
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-5 w-5 text-green-600" />
                                            <CardTitle>Behavior (Perilaku)</CardTitle>
                                        </div>
                                        <CardDescription>
                                            Praktik dan tindakan nyata dalam keamanan siber
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium">Score</span>
                                                    <span className={`text-sm font-bold ${getScoreColor(results.behavior_score)}`}>
                                                        {results.behavior_score.toFixed(1)}/5.0
                                                    </span>
                                                </div>
                                                <Progress value={(results.behavior_score / 5) * 100} className="h-2" />
                                            </div>
                                            <div className="text-center">
                                                <Badge variant="outline" className={getScoreColor(results.behavior_score)}>
                                                    {getScoreLevel(results.behavior_score)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
