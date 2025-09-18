import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function QuestionCard({
    currentAspect,
    currentQuestion,
    currentAnswer,
    onAnswerChange,
    quizData,
    likertScale,
    aspectTitles
}) {
    // Fallback to prevent errors if data is not loaded yet
    const currentQuestionText = quizData?.[currentAspect]?.[currentQuestion] || 'Loading...';
    const currentAspectTitle = aspectTitles?.[currentAspect] || 'Loading...';
    const totalQuestionsInAspect = quizData?.[currentAspect]?.length || 7;

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm font-medium text-primary">
                        {currentAspectTitle}
                    </span>
                </div>
                <CardTitle className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                    Pertanyaan {currentQuestion + 1} dari {totalQuestionsInAspect}
                </CardTitle>
                <CardDescription className="">
                    <h1 className='text-3xl font-semibold text-black dark:text-white leading-relaxed'>
                        {currentQuestionText}
                    </h1>
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Likert Scale Options */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">
                        Pilih tingkat persetujuan Anda:
                    </Label>

                    <div className="space-y-3">
                        {likertScale.map((option) => (
                            <div
                                key={option.value}
                                className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:bg-primary/5 ${
                                    currentAnswer === option.value
                                        ? 'border-primary bg-primary/5'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/30'
                                }`}
                                onClick={() => onAnswerChange(option.value)}
                            >
                                {/* Custom Radio Button */}
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                    currentAnswer === option.value
                                        ? 'border-primary bg-primary'
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}>
                                    {currentAnswer === option.value && (
                                        <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                                    )}
                                </div>

                                {/* Option Content */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
                                                currentAnswer === option.value
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-primary/10 text-primary'
                                            }`}>
                                                {option.label}
                                            </span>
                                            <span className="font-medium">
                                                {option.description}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            ({option.value})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Error Message */}
                {!currentAnswer && (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Silakan pilih salah satu jawaban untuk melanjutkan.
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
