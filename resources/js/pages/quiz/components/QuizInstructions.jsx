import { Card, CardContent } from '@/components/ui/card';

export default function QuizInstructions() {
    return (
        <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
                <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-2">Petunjuk Pengisian:</p>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                        <li>• Pilih jawaban yang paling sesuai dengan kondisi Anda</li>
                        <li>• Tidak ada jawaban yang benar atau salah</li>
                        <li>• Jawab dengan jujur untuk hasil yang akurat</li>
                        <li>• Anda dapat kembali ke pertanyaan sebelumnya</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
