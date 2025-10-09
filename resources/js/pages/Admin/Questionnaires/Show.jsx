import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function QuestionnaireShow({ questionnaire }) {
    // Calculate scores
    const kScore = (
        questionnaire.k1 +
        questionnaire.k2 +
        questionnaire.k3 +
        questionnaire.k4 +
        questionnaire.k5 +
        questionnaire.k6 +
        questionnaire.k7
    ) / 7;

    const aScore = (
        questionnaire.a1 +
        questionnaire.a2 +
        questionnaire.a3 +
        questionnaire.a4 +
        questionnaire.a5 +
        questionnaire.a6 +
        questionnaire.a7
    ) / 7;

    const bScore = (
        questionnaire.b1 +
        questionnaire.b2 +
        questionnaire.b3 +
        questionnaire.b4 +
        questionnaire.b5 +
        questionnaire.b6 +
        questionnaire.b7
    ) / 7;

    const breadcrumbs = [
        { label: 'Dashboard', href: route('admin.dashboard') },
        { label: 'Kuesioner', href: route('admin.questionnaires.index') },
        { label: 'Detail' }
    ];

    // Question labels for each category
    const kQuestions = [
        'K1: Kepuasan terhadap lingkungan kerja',
        'K2: Kepuasan terhadap fasilitas kerja',
        'K3: Kepuasan terhadap komunikasi',
        'K4: Kepuasan terhadap pengakuan',
        'K5: Kepuasan terhadap tantangan pekerjaan',
        'K6: Kepuasan terhadap keseimbangan kehidupan',
        'K7: Kepuasan terhadap pengembangan karir'
    ];

    const aQuestions = [
        'A1: Kejelasan tugas dan tanggung jawab',
        'A2: Dukungan dari atasan',
        'A3: Kerjasama tim',
        'A4: Pelatihan dan pengembangan',
        'A5: Sistem reward dan recognition',
        'A6: Budaya organisasi',
        'A7: Keseimbangan work-life'
    ];

    const bQuestions = [
        'B1: Motivasi untuk bekerja',
        'B2: Komitmen terhadap organisasi',
        'B3: Loyalitas kepada perusahaan',
        'B4: Keinginan untuk berkembang',
        'B5: Kepuasan terhadap kompensasi',
        'B6: Kepuasan terhadap benefit',
        'B7: Kebanggaan bekerja di organisasi'
    ];

    const getScoreColor = (score) => {
        if (score >= 4.5) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        if (score >= 3.5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        if (score >= 2.5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    };

    const getScoreLabel = (score) => {
        if (score >= 4.5) return 'Sangat Baik';
        if (score >= 3.5) return 'Baik';
        if (score >= 2.5) return 'Cukup';
        return 'Perlu Perbaikan';
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Kuesioner - ${questionnaire.employee.name}`} />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="outline" size="sm">
                            <Link href={route('admin.questionnaires.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Detail Kuesioner</h1>
                            <p className="text-muted-foreground">Informasi lengkap respons kuesioner</p>
                        </div>
                    </div>
                </div>

                {/* Employee Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Karyawan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Nama Karyawan</p>
                                    <p className="font-medium">{questionnaire.employee.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Tanggal Pengisian</p>
                                    <p className="font-medium">
                                        {new Date(questionnaire.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Score Summary Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Skor Kepuasan (K)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-3xl font-bold">{kScore.toFixed(2)}</div>
                                    <Badge className={`mt-2 ${getScoreColor(kScore)}`}>
                                        {getScoreLabel(kScore)}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Skor Aspek (A)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-3xl font-bold">{aScore.toFixed(2)}</div>
                                    <Badge className={`mt-2 ${getScoreColor(aScore)}`}>
                                        {getScoreLabel(aScore)}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Skor Behavior (B)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-3xl font-bold">{bScore.toFixed(2)}</div>
                                    <Badge className={`mt-2 ${getScoreColor(bScore)}`}>
                                        {getScoreLabel(bScore)}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Responses */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Category K */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Kategori Kepuasan (K)</CardTitle>
                            <CardDescription>Tingkat kepuasan karyawan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {kQuestions.map((question, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-medium">{question}</p>
                                            <Badge variant="outline">
                                                {questionnaire[`k${index + 1}`]}/5
                                            </Badge>
                                        </div>
                                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-blue-500 h-full transition-all"
                                                style={{ width: `${(questionnaire[`k${index + 1}`] / 5) * 100}%` }}
                                            />
                                        </div>
                                        {index < kQuestions.length - 1 && <Separator className="mt-4" />}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Category A */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Kategori Aspek (A)</CardTitle>
                            <CardDescription>Aspek pekerjaan dan organisasi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {aQuestions.map((question, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-medium">{question}</p>
                                            <Badge variant="outline">
                                                {questionnaire[`a${index + 1}`]}/5
                                            </Badge>
                                        </div>
                                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-green-500 h-full transition-all"
                                                style={{ width: `${(questionnaire[`a${index + 1}`] / 5) * 100}%` }}
                                            />
                                        </div>
                                        {index < aQuestions.length - 1 && <Separator className="mt-4" />}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Category B */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Kategori Behavior (B)</CardTitle>
                            <CardDescription>Perilaku dan sikap kerja</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {bQuestions.map((question, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-medium">{question}</p>
                                            <Badge variant="outline">
                                                {questionnaire[`b${index + 1}`]}/5
                                            </Badge>
                                        </div>
                                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-purple-500 h-full transition-all"
                                                style={{ width: `${(questionnaire[`b${index + 1}`] / 5) * 100}%` }}
                                            />
                                        </div>
                                        {index < bQuestions.length - 1 && <Separator className="mt-4" />}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
