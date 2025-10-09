import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function QuestionnaireIndex({ questionnaires, totalEmployees, completedQuestionnaires }) {
    const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, name: '' });
    const [perPage, setPerPage] = useState(questionnaires.per_page || 15);
    const [search, setSearch] = useState('');

    const handleDeleteClick = (id, employeeName) => {
        setDeleteDialog({ open: true, id, name: employeeName });
    };

    const handleDeleteConfirm = () => {
        if (deleteDialog.id) {
            router.delete(route('admin.questionnaires.destroy', deleteDialog.id));
            setDeleteDialog({ open: false, id: null, name: '' });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialog({ open: false, id: null, name: '' });
    };

    const handlePageChange = (page) => {
        router.get(route('admin.questionnaires.index'), {
            page,
            per_page: perPage,
            search
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handlePerPageChange = (value) => {
        setPerPage(parseInt(value));
        router.get(route('admin.questionnaires.index'), {
            per_page: value,
            page: 1,
            search
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        router.get(route('admin.questionnaires.index'), {
            search: value,
            page: 1,
            per_page: perPage
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const breadcrumbs = [{ label: 'Dashboard', href: route('admin.dashboard') }, { label: 'Kuesioner' }];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Kuesioner" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Kuesioner</h1>
                        <p className="text-muted-foreground">Kelola respons kuesioner karyawan</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Karyawan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalEmployees}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{completedQuestionnaires}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tingkat Penyelesaian</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalEmployees > 0 ? Math.round((completedQuestionnaires / totalEmployees) * 100) : 0}%
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-between items-center mt-4">

                {/* Search Bar */}
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari karyawan..."
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    </div>
                    <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Tampilkan</span>
                            <Select value={perPage.toString()} onValueChange={handlePerPageChange}>
                                <SelectTrigger className="w-20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="15">15</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-sm text-muted-foreground">per halaman</span>
                    </div>
                </div>
                {/* Questionnaires Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Respons Kuesioner</CardTitle>
                        <CardDescription>Daftar semua respons kuesioner dari karyawan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {questionnaires.data.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Karyawan</TableHead>
                                        <TableHead>Skor-K</TableHead>
                                        <TableHead>Skor-A</TableHead>
                                        <TableHead>Skor-B</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {questionnaires.data.map((questionnaire) => {
                                        const kScore =
                                            (questionnaire.k1 +
                                                questionnaire.k2 +
                                                questionnaire.k3 +
                                                questionnaire.k4 +
                                                questionnaire.k5 +
                                                questionnaire.k6 +
                                                questionnaire.k7) /
                                            7;
                                        const aScore =
                                            (questionnaire.a1 +
                                                questionnaire.a2 +
                                                questionnaire.a3 +
                                                questionnaire.a4 +
                                                questionnaire.a5 +
                                                questionnaire.a6 +
                                                questionnaire.a7) /
                                            7;
                                        const bScore =
                                            (questionnaire.b1 +
                                                questionnaire.b2 +
                                                questionnaire.b3 +
                                                questionnaire.b4 +
                                                questionnaire.b5 +
                                                questionnaire.b6 +
                                                questionnaire.b7) /
                                            7;

                                        return (
                                            <TableRow key={questionnaire.id}>
                                                <TableCell className="font-medium">{questionnaire.employee.name}</TableCell>
                                                <TableCell>{kScore.toFixed(2)}</TableCell>
                                                <TableCell>{aScore.toFixed(2)}</TableCell>
                                                <TableCell>{bScore.toFixed(2)}</TableCell>
                                                <TableCell>{new Date(questionnaire.created_at).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button asChild variant="outline" size="sm">
                                                            <Link href={route('admin.questionnaires.show', questionnaire.id)}>
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button asChild variant="outline" size="sm">
                                                            <Link href={route('admin.questionnaires.edit', questionnaire.id)}>
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDeleteClick(questionnaire.id, questionnaire.employee.name)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="py-8 text-center">
                                <p className="text-muted-foreground">Tidak ada kuesioner ditemukan</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination and Row Count */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


                    {questionnaires.last_page > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (questionnaires.current_page > 1) {
                                                handlePageChange(questionnaires.current_page - 1);
                                            }
                                        }}
                                        className={questionnaires.current_page === 1 ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>

                                {Array.from({ length: questionnaires.last_page }, (_, i) => i + 1)
                                    .filter(page => {
                                        const current = questionnaires.current_page;
                                        return page === 1 || page === questionnaires.last_page || (page >= current - 1 && page <= current + 1);
                                    })
                                    .map((page, index, array) => {
                                        if (index > 0 && page - array[index - 1] > 1) {
                                            return (
                                                <PaginationItem key={`ellipsis-${page}`}>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            );
                                        }
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(page);
                                                    }}
                                                    isActive={page === questionnaires.current_page}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (questionnaires.current_page < questionnaires.last_page) {
                                                handlePageChange(questionnaires.current_page + 1);
                                            }
                                        }}
                                        className={questionnaires.current_page === questionnaires.last_page ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && handleDeleteCancel()}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Hapus Kuesioner</DialogTitle>
                            <DialogDescription>
                                Apakah Anda yakin ingin menghapus kuesioner untuk <strong>{deleteDialog.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleDeleteCancel}>
                                Batal
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteConfirm}>
                                Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
