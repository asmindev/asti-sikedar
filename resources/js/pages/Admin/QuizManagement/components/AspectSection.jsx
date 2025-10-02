import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Heart, Activity } from 'lucide-react';
import QuestionCard from './QuestionCard';

const aspectIcons = {
    knowledge: Brain,
    attitude: Heart,
    behavior: Activity
};

const aspectColors = {
    knowledge: 'text-blue-600 bg-blue-100 dark:bg-blue-950 dark:text-blue-400',
    attitude: 'text-red-600 bg-red-100 dark:bg-red-950 dark:text-red-400',
    behavior: 'text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-400'
};

export default function AspectSection({ aspect, title, questions }) {
    const Icon = aspectIcons[aspect];
    const colorClass = aspectColors[aspect];

    const activeQuestions = questions.filter(q => q.is_active);
    const totalQuestions = questions.length;

    return (
        <Card className="border-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${colorClass}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{title}</CardTitle>
                            <CardDescription>
                                {activeQuestions.length} dari 7 pertanyaan aktif • {totalQuestions} total pertanyaan
                            </CardDescription>
                        </div>
                    </div>
                    <Badge
                        variant={activeQuestions.length === 7 ? "default" : "destructive"}
                        className="font-mono"
                    >
                        {activeQuestions.length}/7
                    </Badge>
                </div>

                {activeQuestions.length !== 7 && (
                    <div className="mt-2 p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                        <p className="text-sm text-orange-800 dark:text-orange-200">
                            ⚠️ Aspek ini harus memiliki tepat 7 pertanyaan aktif.
                            Saat ini memiliki {activeQuestions.length} pertanyaan aktif.
                        </p>
                    </div>
                )}
            </CardHeader>

            <CardContent>
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all">
                            Semua Pertanyaan ({totalQuestions})
                        </TabsTrigger>
                        <TabsTrigger value="active">
                            Aktif ({activeQuestions.length})
                        </TabsTrigger>
                        <TabsTrigger value="inactive">
                            Tidak Aktif ({totalQuestions - activeQuestions.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="space-y-4">
                            {questions
                                .sort((a, b) => a.order - b.order)
                                .map((question) => (
                                    <QuestionCard
                                        key={question.id}
                                        question={question}
                                        aspectTitle={title}
                                    />
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="active" className="mt-6">
                        <div className="space-y-4">
                            {questions
                                .filter(q => q.is_active)
                                .sort((a, b) => a.order - b.order)
                                .map((question) => (
                                    <QuestionCard
                                        key={question.id}
                                        question={question}
                                        aspectTitle={title}
                                    />
                                ))}
                        </div>
                        {activeQuestions.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                Tidak ada pertanyaan aktif ditemukan
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="inactive" className="mt-6">
                        <div className="space-y-4">
                            {questions
                                .filter(q => !q.is_active)
                                .sort((a, b) => a.order - b.order)
                                .map((question) => (
                                    <QuestionCard
                                        key={question.id}
                                        question={question}
                                        aspectTitle={title}
                                    />
                                ))}
                        </div>
                        {totalQuestions - activeQuestions.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                Tidak ada pertanyaan tidak aktif ditemukan
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
