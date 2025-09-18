import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, Activity, BarChart3 } from 'lucide-react';

export default function KABScoreCard({ clusterResult, questionnaire }) {
    if (!clusterResult || !questionnaire) {
        return (
            <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-gray-500" />
                        Skor KAB (Knowledge, Attitude, Behavior)
                    </CardTitle>
                    <CardDescription>
                        Skor detail akan tersedia setelah analisis klaster selesai
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Skor KAB belum tersedia</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Calculate scores from questionnaire data
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
        if (score >= 80) return { text: 'Excellent', variant: 'default', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
        if (score >= 60) return { text: 'Good', variant: 'secondary', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' };
        return { text: 'Needs Improvement', variant: 'destructive', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' };
    };

    const scores = [
        {
            title: 'Knowledge (Pengetahuan)',
            subtitle: 'Pemahaman tentang keamanan informasi',
            score: knowledgeScore,
            icon: Brain,
            color: 'text-blue-600 dark:text-blue-400'
        },
        {
            title: 'Attitude (Sikap)',
            subtitle: 'Sikap terhadap keamanan informasi',
            score: attitudeScore,
            icon: Heart,
            color: 'text-purple-600 dark:text-purple-400'
        },
        {
            title: 'Behavior (Perilaku)',
            subtitle: 'Praktik keamanan sehari-hari',
            score: behaviorScore,
            icon: Activity,
            color: 'text-green-600 dark:text-green-400'
        }
    ];

    return (
        <Card className="border-gray-200 dark:border-gray-700 h-fit">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Skor KAB Anda
                </CardTitle>
                <CardDescription>
                    Evaluasi tingkat Knowledge, Attitude, dan Behavior keamanan informasi
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Overall Score */}
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        Skor Rata-rata Keseluruhan
                    </h3>
                    <div className="flex items-center justify-center gap-3">
                        <span className={`text-3xl font-bold ${getScoreColor(averageScore)}`}>
                            {averageScore.toFixed(1)}%
                        </span>
                        <Badge className={getScoreBadge(averageScore).color}>
                            {getScoreBadge(averageScore).text}
                        </Badge>
                    </div>
                </div>

                {/* Individual Scores */}
                <div className="space-y-4">
                    {scores.map((item, index) => {
                        const Icon = item.icon;
                        const badge = getScoreBadge(item.score);

                        return (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Icon className={`h-5 w-5 ${item.color}`} />
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`font-bold ${getScoreColor(item.score)}`}>
                                            {item.score.toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                                <Progress
                                    value={item.score}
                                    className="h-2"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Score Interpretation */}
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Interpretasi Skor
                    </h4>
                    <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <div className="flex justify-between">
                            <span>80-100%:</span>
                            <span className="font-medium">Excellent</span>
                        </div>
                        <div className="flex justify-between">
                            <span>60-79%:</span>
                            <span className="font-medium">Good</span>
                        </div>
                        <div className="flex justify-between">
                            <span>0-59%:</span>
                            <span className="font-medium">Needs Improvement</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
