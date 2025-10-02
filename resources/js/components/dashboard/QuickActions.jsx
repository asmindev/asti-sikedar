import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Download, FileText, Users, Settings, Shield } from 'lucide-react';

export default function QuickActions() {
    const actions = [
        {
            title: 'Kelola Pegawai',
            description: 'Tambah, edit, atau hapus data pegawai',
            icon: Users,
            href: route('admin.employees.index'),
            variant: 'default'
        },
        // {
        //     title: 'Upload Kuesioner',
        //     description: 'Import data kuesioner dari file Excel',
        //     icon: FileText,
        //     href: route('admin.questionnaires.upload'),
        //     variant: 'outline'
        // },
        {
            title: 'Analisis Klaster',
            description: 'Jalankan analisis K-Means clustering',
            icon: BarChart3,
            href: route('admin.clusters.analysis'),
            variant: 'outline'
        },
        {
            title: 'Manajemen Quiz',
            description: 'Kelola pertanyaan dan opsi quiz',
            icon: Settings,
            href: route('admin.quiz-management.index'),
            variant: 'outline'
        }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Aksi Cepat
                </CardTitle>
                <CardDescription>
                    Kelola sistem secara efisien dengan menu utama
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Button
                            key={action.title}
                            asChild
                            variant={action.variant}
                            className="w-full justify-start h-auto p-4"
                        >
                            <a href={action.href} className="block">
                                <div className="flex items-start gap-3">
                                    <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <div className="text-left">
                                        <div className="font-medium">{action.title}</div>
                                        <div className="text-sm text-muted-foreground font-normal">
                                            {action.description}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </Button>
                    );
                })}
            </CardContent>
        </Card>
    );
}
