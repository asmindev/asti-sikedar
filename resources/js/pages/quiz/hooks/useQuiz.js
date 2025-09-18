import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export function useQuiz(employee, quizData, questionsPerAspect = 7) {
    const [currentAspect, setCurrentAspect] = useState('knowledge');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        employee_id: employee.id,
        k1: '', k2: '', k3: '', k4: '', k5: '', k6: '', k7: '',
        a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', a7: '',
        b1: '', b2: '', b3: '', b4: '', b5: '', b6: '', b7: ''
    });

    const getCurrentQuestionNumber = () => {
        if (!quizData) return 1;
        const aspectIndex = Object.keys(quizData).indexOf(currentAspect);
        return aspectIndex * questionsPerAspect + currentQuestion + 1;
    };

    const getFieldName = () => {
        const aspectPrefix = currentAspect === 'knowledge' ? 'k' : currentAspect === 'attitude' ? 'a' : 'b';
        return `${aspectPrefix}${currentQuestion + 1}`;
    };

    const getCurrentAnswer = () => {
        const fieldName = getFieldName();
        return data[fieldName];
    };

    const handleAnswerChange = (value) => {
        const fieldName = getFieldName();
        setData(fieldName, value);
    };

    const getMaxQuestions = () => {
        if (!quizData || !quizData[currentAspect]) return 7;
        return quizData[currentAspect].length;
    };

    const goToNextQuestion = () => {
        const maxQuestions = getMaxQuestions();
        if (currentQuestion < maxQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Move to next aspect
            if (currentAspect === 'knowledge') {
                setCurrentAspect('attitude');
                setCurrentQuestion(0);
                toast.info('Aspek Knowledge selesai!', {
                    description: 'Lanjut ke Aspek Attitude (Sikap)',
                    duration: 2000,
                });
            } else if (currentAspect === 'attitude') {
                setCurrentAspect('behavior');
                setCurrentQuestion(0);
                toast.info('Aspek Attitude selesai!', {
                    description: 'Lanjut ke Aspek Behavior (Perilaku)',
                    duration: 2000,
                });
            } else {
                // All questions completed, show results
                setShowResults(true);
                toast.success('Semua pertanyaan selesai!', {
                    description: 'Siap untuk mengirim jawaban Anda.',
                    duration: 3000,
                });
            }
        }
    };

    const goToPrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else {
            // Move to previous aspect
            if (currentAspect === 'attitude') {
                setCurrentAspect('knowledge');
                const knowledgeQuestions = quizData?.knowledge?.length || 7;
                setCurrentQuestion(knowledgeQuestions - 1);
            } else if (currentAspect === 'behavior') {
                setCurrentAspect('attitude');
                const attitudeQuestions = quizData?.attitude?.length || 7;
                setCurrentQuestion(attitudeQuestions - 1);
            }
        }
    };

    const isFirstQuestion = currentAspect === 'knowledge' && currentQuestion === 0;
    const isLastQuestion = currentAspect === 'behavior' && currentQuestion === getMaxQuestions() - 1;

    const handleSubmit = () => {
        // Check if all questions are answered
        const allAnswered = Object.keys(data).every(key => {
            if (key === 'employee_id') return true;
            return data[key] !== '';
        });

        if (!allAnswered) {
            toast.warning('Mohon jawab semua pertanyaan sebelum mengirim kuis.', {
                description: 'Pastikan semua pertanyaan telah dijawab sebelum submit.',
                duration: 4000,
            });
            return;
        }

        post(route('user.quiz.store'), {
            onSuccess: () => {
                toast.success('Kuis berhasil dikirim!', {
                    description: 'Terima kasih atas partisipasi Anda. Hasil akan segera tersedia.',
                    duration: 5000,
                });
            },
            onError: (errors) => {
                toast.error('Gagal mengirim kuis', {
                    description: 'Terjadi kesalahan saat menyimpan jawaban. Silakan coba lagi.',
                    duration: 4000,
                });
            }
        });
    };

    return {
        currentAspect,
        currentQuestion,
        showResults,
        data,
        processing,
        errors,
        getCurrentQuestionNumber,
        getCurrentAnswer,
        handleAnswerChange,
        goToNextQuestion,
        goToPrevQuestion,
        isFirstQuestion,
        isLastQuestion,
        handleSubmit
    };
}
