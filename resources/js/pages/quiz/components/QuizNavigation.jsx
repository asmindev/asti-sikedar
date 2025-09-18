import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function QuizNavigation({
    onPrevious,
    onNext,
    isFirstQuestion,
    isLastQuestion,
    canProceed
}) {
    return (
        <div className="flex justify-between pt-4">
            <Button
                variant="outline"
                onClick={onPrevious}
                disabled={isFirstQuestion}
                className="flex items-center gap-2"
            >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
            </Button>

            <Button
                onClick={onNext}
                disabled={!canProceed}
                className="flex items-center gap-2"
            >
                {isLastQuestion ? 'Selesai' : 'Selanjutnya'}
                {!isLastQuestion && <ChevronRight className="h-4 w-4" />}
            </Button>
        </div>
    );
}
