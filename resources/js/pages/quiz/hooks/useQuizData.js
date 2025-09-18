import { useState, useEffect } from 'react';
import axios from 'axios';

export function useQuizData() {
    const [quizData, setQuizData] = useState(null);
    const [likertScale, setLikertScale] = useState([]);
    const [aspectTitles, setAspectTitles] = useState({});
    const [totalQuestions, setTotalQuestions] = useState(21);
    const [questionsPerAspect, setQuestionsPerAspect] = useState(7);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/quiz-data');

                if (response.data.success) {
                    const { data } = response.data;
                    setQuizData(data.quizData);
                    setLikertScale(data.likertScale);
                    setAspectTitles(data.aspectTitles);
                    setTotalQuestions(data.totalQuestions);
                    setQuestionsPerAspect(data.questionsPerAspect);
                } else {
                    setError('Failed to load quiz data');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load quiz data');
                console.error('Error fetching quiz data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, []);

    return {
        quizData,
        likertScale,
        aspectTitles,
        totalQuestions,
        questionsPerAspect,
        loading,
        error
    };
}
