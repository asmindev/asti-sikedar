import UserLayout from '@/layouts/UserLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    CheckCircle,
    FileText,
    Calendar,
    User,
    Brain,
    Heart,
    Activity,
    ArrowLeftRight
} from 'lucide-react';

export default function QuizResult({ employee, questionnaire, questions }) {
    const breadcrumbs = [
        { label: 'Dashboard', href: route('user.dashboard') },
        { label: 'Kuesioner', href: route('user.quiz') },
        { label: 'Hasil Kuesioner' }
    ];

    // Calculate scores
    const calculateKScore = () => {
        const total = questionnaire.k1 + questionnaire.k2 + questionnaire.k3 + questionnaire.k4 +
                     questionnaire.k5 + questionnaire.k6 + questionnaire.k7;
        return (total / 35) * 100;
    };

    const calculateAScore = () => {
        const total = questionnaire.a1 + questionnaire.a2 + questionnaire.a3 + questionnaire.a4 +
                     questionnaire.a5 + questionnaire.a6 + questionnaire.a7;
        return (total / 35) * 100;
    };

    const calculateBScore = () => {
        const total = questionnaire.b1 + questionnaire.b2 + questionnaire.b3 + questionnaire.b4 +
                     questionnaire.b5 + questionnaire.b6 + questionnaire.b7;
        return (total / 35) * 100;
    };

    const knowledgeScore = calculateKScore();
    const attitudeScore = calculateAScore();
    const behaviorScore = calculateBScore();
    const averageScore = (knowledgeScore + attitudeScore + behaviorScore) / 3;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 dark:text-green-400';
        if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getScoreBadge = (score) => {
        if (score >= 80) return { text: 'Excellent', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
        if (score >= 60) return { text: 'Good', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' };
        return { text: 'Needs Improvement', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' };
    };

    const getLikertText = (value) => {
        const likertScale = {
            5: 'Sangat Setuju',
            4: 'Setuju',
            3: 'Cukup Setuju',
            2: 'Tidak Setuju',
            1: 'Sangat Tidak Setuju'
        };
        return likertScale[value] || 'N/A';
    };

    const getLikertColor = (value) => {
        if (value >= 4) return 'text-green-600 dark:text-green-400';
        if (value === 3) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    return (
        <UserLayout breadcrumbs={breadcrumbs}>
            <Head title="Hasil Kuesioner" />

            <div className="p-6 space-y-6">
                {/* Header Section */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                            <div>
                                <h3 className="text-2xl font-bold">Hasil Kuesioner Keamanan Informasi</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Kuesioner telah diselesaikan pada {new Date(questionnaire.created_at).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Employee Info */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm font-medium">Nama:</span>
                                    <span className="text-sm">{employee.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm font-medium">Tanggal:</span>
                                    <span className="text-sm">{new Date(questionnaire.created_at).toLocaleDateString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Scores */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm flex items-center gap-2">
                                <Brain className="h-4 w-4 text-blue-600" />
                                Knowledge
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-2">
                                <span className={getScoreColor(knowledgeScore)}>
                                    {knowledgeScore.toFixed(1)}%
                                </span>
                            </div>
                            <Progress value={knowledgeScore} className="h-2 mb-2" />
                            <Badge className={getScoreBadge(knowledgeScore).color}>
                                {getScoreBadge(knowledgeScore).text}
                            </Badge>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm flex items-center gap-2">
                                <Heart className="h-4 w-4 text-purple-600" />
                                Attitude
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-2">
                                <span className={getScoreColor(attitudeScore)}>
                                    {attitudeScore.toFixed(1)}%
                                </span>
                            </div>
                            <Progress value={attitudeScore} className="h-2 mb-2" />
                            <Badge className={getScoreBadge(attitudeScore).color}>
                                {getScoreBadge(attitudeScore).text}
                            </Badge>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm flex items-center gap-2">
                                <Activity className="h-4 w-4 text-green-600" />
                                Behavior
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-2">
                                <span className={getScoreColor(behaviorScore)}>
                                    {behaviorScore.toFixed(1)}%
                                </span>
                            </div>
                            <Progress value={behaviorScore} className="h-2 mb-2" />
                            <Badge className={getScoreBadge(behaviorScore).color}>
                                {getScoreBadge(behaviorScore).text}
                            </Badge>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Total Average</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold mb-2">
                                <span className={getScoreColor(averageScore)}>
                                    {averageScore.toFixed(1)}%
                                </span>
                            </div>
                            <Progress value={averageScore} className="h-2 mb-2" />
                            <Badge className={getScoreBadge(averageScore).color}>
                                {getScoreBadge(averageScore).text}
                            </Badge>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Answers with Tabs */}
                <Tabs defaultValue="knowledge" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="knowledge" className="flex items-center gap-2">
                            <Brain className="h-4 w-4" />
                            Knowledge
                        </TabsTrigger>
                        <TabsTrigger value="attitude" className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Attitude
                        </TabsTrigger>
                        <TabsTrigger value="behavior" className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Behavior
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="knowledge" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-blue-600" />
                                    Knowledge (Pengetahuan)
                                </CardTitle>
                                <CardDescription>Tingkat pemahaman tentang keamanan informasi</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {questions.knowledge.map((q, index) => (
                                    <div key={q.key} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                                                {index + 1}. {q.text}
                                            </p>
                                            {q.is_reversed && (
                                                <Badge variant="outline" className="ml-2 text-xs border-orange-500 text-orange-700 dark:text-orange-400 shrink-0">
                                                    <ArrowLeftRight className="h-3 w-3 mr-1" />
                                                    Reversed
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-medium ${getLikertColor(questionnaire[q.key])}`}>
                                                {getLikertText(questionnaire[q.key])}
                                            </span>
                                            <Badge variant="outline" className="ml-2">
                                                Skor: {questionnaire[q.key]}/5
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="attitude" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-purple-600" />
                                    Attitude (Sikap)
                                </CardTitle>
                                <CardDescription>Sikap terhadap keamanan informasi</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {questions.attitude.map((q, index) => (
                                    <div key={q.key} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                                                {index + 1}. {q.text}
                                            </p>
                                            {q.is_reversed && (
                                                <Badge variant="outline" className="ml-2 text-xs border-orange-500 text-orange-700 dark:text-orange-400 shrink-0">
                                                    <ArrowLeftRight className="h-3 w-3 mr-1" />
                                                    Reversed
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-medium ${getLikertColor(questionnaire[q.key])}`}>
                                                {getLikertText(questionnaire[q.key])}
                                            </span>
                                            <Badge variant="outline" className="ml-2">
                                                Skor: {questionnaire[q.key]}/5
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="behavior" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-green-600" />
                                    Behavior (Perilaku)
                                </CardTitle>
                                <CardDescription>Praktik keamanan sehari-hari</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {questions.behavior.map((q, index) => (
                                    <div key={q.key} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                                                {index + 1}. {q.text}
                                            </p>
                                            {q.is_reversed && (
                                                <Badge variant="outline" className="ml-2 text-xs border-orange-500 text-orange-700 dark:text-orange-400 shrink-0">
                                                    <ArrowLeftRight className="h-3 w-3 mr-1" />
                                                    Reversed
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-medium ${getLikertColor(questionnaire[q.key])}`}>
                                                {getLikertText(questionnaire[q.key])}
                                            </span>
                                            <Badge variant="outline" className="ml-2">
                                                Skor: {questionnaire[q.key]}/5
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </UserLayout>
    );
}
