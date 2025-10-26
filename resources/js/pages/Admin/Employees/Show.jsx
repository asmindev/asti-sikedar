import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { ArrowLeft, BarChart3, Calendar, Edit, FileText, Mail, User, UserCheck } from 'lucide-react';

export default function EmployeeShow({ employee }) {
    const breadcrumbs = [
        { label: 'Dasbor', href: route('admin.dashboard') },
        { label: 'Manajemen Karyawan', href: route('admin.employees.index') },
        { label: employee.name },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Karyawan - ${employee.name}`} />

            <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{employee.name}</h1>
                        <p className="text-muted-foreground">Detail Karyawan</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <a href={route('admin.employees.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Daftar
                            </a>
                        </Button>
                        <Button asChild>
                            <a href={route('admin.employees.edit', employee.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Karyawan
                            </a>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Basic Information */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5" />
                                Informasi Pribadi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Nama Lengkap</p>
                                    <p className="text-lg font-medium">{employee.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Posisi</p>
                                    <p className="text-lg">{employee.position}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Umur</p>
                                    <p className="text-lg">{employee.age}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-lg">{employee.user?.email}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Jenis Kelamin</p>
                                    <p className="text-lg">{employee.gender}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Tingkat Pendidikan</p>
                                    {employee.education_level ? (
                                        <Badge variant="outline" className="text-base">{employee.education_level}</Badge>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">Belum diisi</p>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Dibuat</p>
                                    <p className="text-sm">
                                        {new Date(employee.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Terakhir Diperbarui</p>
                                    <p className="text-sm">
                                        {new Date(employee.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Account & Status Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <UserCheck className="mr-2 h-5 w-5" />
                                Akun Pengguna & Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div>
                                    <p className="mb-2 text-sm font-medium text-muted-foreground">Akun Pengguna</p>
                                    {employee.user ? (
                                        <div className="space-y-2">
                                            <Badge
                                                variant={employee.user.role === 'admin' ? 'default' : 'secondary'}
                                                className="w-full justify-center"
                                            >
                                                Akun {employee.user.role}
                                            </Badge>
                                            <div className="flex items-center justify-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm text-muted-foreground">{employee.user.email}</p>
                                            </div>
                                            <p className="text-center text-xs text-muted-foreground">
                                                Dibuat: {new Date(employee.user.created_at).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    ) : (
                                        <Badge variant="outline" className="w-full justify-center">
                                            Tidak Ada Akun Pengguna
                                        </Badge>
                                    )}
                                </div>

                                <Separator />

                                <div>
                                    <p className="mb-2 text-sm font-medium text-muted-foreground">Status Survei</p>
                                    <Badge variant={employee.questionnaire ? 'success' : 'destructive'} className="w-full justify-center">
                                        {employee.questionnaire ? 'Selesai' : 'Menunggu'}
                                    </Badge>
                                    {employee.questionnaire && (
                                        <p className="mt-1 text-center text-xs text-muted-foreground">
                                            Selesai: {new Date(employee.questionnaire.created_at).toLocaleDateString('id-ID')}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <p className="mb-2 text-sm font-medium text-muted-foreground">Status Pengelompokan</p>
                                    <Badge variant={employee.cluster_result ? 'default' : 'outline'} className="w-full justify-center">
                                        {employee.cluster_result ? 'Telah Dianalisis' : 'Belum Dianalisis'}
                                    </Badge>
                                    {employee.cluster_result && (
                                        <p className="mt-1 text-center text-xs text-muted-foreground">
                                            Cluster: {employee.cluster_result.cluster_id}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Questionnaire Details */}
                    {employee.questionnaire && (
                        <Card className="md:col-span-2 lg:col-span-3">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileText className="mr-2 h-5 w-5" />
                                    Respons Kuesioner
                                </CardTitle>
                                <CardDescription>
                                    Survei diselesaikan pada{' '}
                                    {new Date(employee.questionnaire.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-3">
                                    {/* K Questions */}
                                    <div>
                                        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Pertanyaan Pengetahuan</h4>
                                        <div className="grid grid-cols-4 gap-2 text-sm">
                                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                                <div key={`k${num}`} className="text-center">
                                                    <p className="font-mono text-xs text-muted-foreground">K{num}</p>
                                                    <p className="font-medium">{employee.questionnaire[`k${num}`]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* A Questions */}
                                    <div>
                                        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Pertanyaan Sikap</h4>
                                        <div className="grid grid-cols-4 gap-2 text-sm">
                                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                                <div key={`a${num}`} className="text-center">
                                                    <p className="font-mono text-xs text-muted-foreground">A{num}</p>
                                                    <p className="font-medium">{employee.questionnaire[`a${num}`]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* B Questions */}
                                    <div>
                                        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Pertanyaan Perilaku</h4>
                                        <div className="grid grid-cols-4 gap-2 text-sm">
                                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                                <div key={`b${num}`} className="text-center">
                                                    <p className="font-mono text-xs text-muted-foreground">B{num}</p>
                                                    <p className="font-medium">{employee.questionnaire[`b${num}`]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Cluster Results */}
                    {employee.cluster_result && (
                        <Card className="md:col-span-2 lg:col-span-3">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <BarChart3 className="mr-2 h-5 w-5" />
                                    Hasil Analisis Cluster
                                </CardTitle>
                                <CardDescription>
                                    Analisis dilakukan pada{' '}
                                    {new Date(employee.cluster_result.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-primary">{employee.cluster_result.cluster_id}</p>
                                        <p className="text-sm text-muted-foreground">ID Cluster</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{employee.cluster_result.knowledge_score}</p>
                                        <p className="text-sm text-muted-foreground">Skor Pengetahuan</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{employee.cluster_result.attitude_score}</p>
                                        <p className="text-sm text-muted-foreground">Skor Sikap</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{employee.cluster_result.behavior_score}</p>
                                        <p className="text-sm text-muted-foreground">Skor Perilaku</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
