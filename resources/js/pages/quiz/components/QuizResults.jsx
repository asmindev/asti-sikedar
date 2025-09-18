import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuizResults({ employee, onSubmit, processing }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="mx-auto max-w-2xl">
                <Card className="shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-green-600 dark:text-green-400">
                            Kuis Selesai!
                        </CardTitle>
                        <CardDescription>
                            Terima kasih telah mengisi kuis keamanan siber
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div className="space-y-4">
                            <p className="text-lg font-medium">
                                Halo, <span className="text-blue-600 dark:text-blue-400">{employee.name}</span>
                            </p>
                            <p className="text-muted-foreground">
                                Anda telah menyelesaikan semua 21 pertanyaan dalam kuis ini.
                                Jawaban Anda akan membantu kami memahami tingkat kesadaran keamanan siber
                                di organisasi.
                            </p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Aspek yang telah dinilai:</h4>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                                <li>✓ Knowledge (Pengetahuan) - 7 pertanyaan</li>
                                <li>✓ Attitude (Sikap) - 7 pertanyaan</li>
                                <li>✓ Behavior (Perilaku) - 7 pertanyaan</li>
                            </ul>
                        </div>

                        <Button
                            onClick={onSubmit}
                            disabled={processing}
                            className="w-full"
                            size="lg"
                        >
                            {processing ? 'Mengirim...' : 'Kirim Jawaban'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
