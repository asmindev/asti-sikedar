import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function QuizProgress({ currentQuestionNumber, totalQuestions = 21 }) {
    const progressValue = (currentQuestionNumber / totalQuestions) * 100;

    return (
        <Card className="mb-6">
            <CardContent className="pt-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Pertanyaan {currentQuestionNumber} dari {totalQuestions}</span>
                        <span>{Math.round(progressValue)}%</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                </div>
            </CardContent>
        </Card>
    );
}
