import { Head } from '@inertiajs/react';
import { useQuiz } from './hooks/useQuiz';
import { useQuizData } from './hooks/useQuizData';
import QuizHeader from './components/QuizHeader';
import QuizProgress from './components/QuizProgress';
import QuestionCard from './components/QuestionCard';
import QuizNavigation from './components/QuizNavigation';
import QuizResults from './components/QuizResults';
import QuizInstructions from './components/QuizInstructions';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function Quiz({ employee }) {
    const {
        quizData,
        likertScale,
        aspectTitles,
        totalQuestions,
        questionsPerAspect,
        loading,
        error
    } = useQuizData();

    const {
        currentAspect,
        currentQuestion,
        showResults,
        processing,
        getCurrentQuestionNumber,
        getCurrentAnswer,
        handleAnswerChange,
        goToNextQuestion,
        goToPrevQuestion,
        isFirstQuestion,
        isLastQuestion,
        handleSubmit
    } = useQuiz(employee, quizData, questionsPerAspect);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
                <Head title="Loading Quiz..." />
                <div className="mx-auto max-w-4xl">
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                            <h3 className="mt-4 text-lg font-semibold">Loading Quiz...</h3>
                            <p className="text-muted-foreground">
                                Please wait while we prepare your quiz questions.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
                <Head title="Quiz Error" />
                <div className="mx-auto max-w-4xl">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {error}. Please refresh the page or contact administrator.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }

    if (showResults) {
        return (
            <>
                <Head title="Hasil Kuis" />
                <QuizResults
                    employee={employee}
                    onSubmit={handleSubmit}
                    processing={processing}
                />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <Head title="Kuis Keamanan Siber" />

            <div className="mx-auto max-w-4xl">
                <QuizHeader employee={employee} />

                <QuizProgress
                    currentQuestionNumber={getCurrentQuestionNumber()}
                    totalQuestions={totalQuestions}
                />

                <QuestionCard
                    currentAspect={currentAspect}
                    currentQuestion={currentQuestion}
                    currentAnswer={getCurrentAnswer()}
                    onAnswerChange={handleAnswerChange}
                    quizData={quizData}
                    likertScale={likertScale}
                    aspectTitles={aspectTitles}
                />

                <div className="mt-6">
                    <QuizNavigation
                        onPrevious={goToPrevQuestion}
                        onNext={goToNextQuestion}
                        isFirstQuestion={isFirstQuestion}
                        isLastQuestion={isLastQuestion}
                        canProceed={!!getCurrentAnswer()}
                    />
                </div>

                <QuizInstructions />
            </div>
        </div>
    );
}
