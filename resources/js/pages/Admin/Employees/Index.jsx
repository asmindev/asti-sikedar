import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Edit, Eye, Plus, Search, Trash2, UserCheck, UserMinus, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

export default function Employee({ employees, departments, filters }) {
    const { flash } = usePage().props;
    console.log('EmployeeIndex props:', flash);
    const breadcrumbs = [{ label: 'Dashboard', href: route('admin.dashboard') }, { label: 'Manajemen Karyawan' }];

    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        employee: null,
    });

    const [removeUserDialog, setRemoveUserDialog] = useState({
        open: false,
        employee: null,
    });

    const [search, setSearch] = useState(filters?.search || '');
    const [department, setDepartment] = useState(filters?.department || 'all');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            '/admin/employees',
            {
                search,
                department: department === 'all' ? '' : department,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDeleteClick = (employee) => {
        setDeleteDialog({
            open: true,
            employee: employee,
        });
    };

    const handleDeleteConfirm = () => {
        if (deleteDialog.employee) {
            router.delete(route('admin.employees.destroy', deleteDialog.employee.id));
        }
        setDeleteDialog({ open: false, employee: null });
    };

    const handleDeleteCancel = () => {
        setDeleteDialog({ open: false, employee: null });
    };

    const handleRemoveUserClick = (employee) => {
        setRemoveUserDialog({
            open: true,
            employee: employee,
        });
    };

    const handleRemoveUserConfirm = () => {
        if (removeUserDialog.employee) {
            router.delete(route('admin.employees.remove-user', removeUserDialog.employee.id));
        }
        setRemoveUserDialog({ open: false, employee: null });
    };

    const handleRemoveUserCancel = () => {
        setRemoveUserDialog({ open: false, employee: null });
    };

    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Format a date string as a localized date string for Indonesian locale.
     * @param {string} dateString - the date string to be formatted
     * @returns {string} the formatted date string
     */
    /*******  297b1c8b-2f66-493a-aadc-fec99c6436cb  *******/
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID');
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Karyawan" />

            <div className="p-6">
                {/* Flash Messages */}
                {flash.success && (
                    <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-4">
                        <p className="text-green-800">{flash.success}</p>
                    </div>
                )}
                {flash.error && (
                    <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
                        <p className="text-red-800">{flash.error}</p>
                    </div>
                )}

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Manajemen Karyawan</h1>
                        <p className="text-muted-foreground">Kelola karyawan dan akun pengguna mereka</p>
                    </div>
                    <Button asChild>
                        <a href={route('admin.employees.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Karyawan
                        </a>
                    </Button>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Cari & Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Cari berdasarkan nama, kode, departemen, atau posisi..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={department} onValueChange={setDepartment}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Semua Departemen" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Departemen</SelectItem>
                                    {departments?.map((dept) => (
                                        <SelectItem key={dept} value={dept}>
                                            {dept}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button type="submit">Filter</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Users className="mr-2 h-5 w-5" />
                            Daftar Karyawan
                        </CardTitle>
                        <CardDescription>
                            {employees?.data?.length > 0 ? `${employees.total} karyawan ditemukan` : 'Belum ada karyawan yang ditambahkan'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {employees?.data?.length > 0 ? (
                            <div className="space-y-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Kode Karyawan</TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Departemen</TableHead>
                                            <TableHead>Posisi</TableHead>
                                            <TableHead>Jenis Kelamin</TableHead>
                                            <TableHead>Akun Pengguna</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {employees.data.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell className="font-mono text-sm">{employee.employee_code}</TableCell>
                                                <TableCell className="font-medium">{employee.name}</TableCell>
                                                <TableCell>{employee.department}</TableCell>
                                                <TableCell>{employee.position}</TableCell>
                                                <TableCell>{employee.gender}</TableCell>
                                                <TableCell>
                                                    {employee.user ? (
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant={employee.user.role === 'admin' ? 'default' : 'secondary'}>
                                                                <UserCheck className="mr-1 h-3 w-3" />
                                                                {employee.user.role}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground">{employee.user.email}</span>
                                                        </div>
                                                    ) : (
                                                        <Badge variant="outline">Tidak Ada Akun</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <a href={route('admin.employees.show', employee.id)}>
                                                                <Eye className="h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                        <Button variant="outline" size="sm" asChild>
                                                            <a href={route('admin.employees.edit', employee.id)}>
                                                                <Edit className="h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                        {employee.user ? (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleRemoveUserClick(employee)}
                                                                className="text-orange-600 hover:text-orange-700"
                                                            >
                                                                <UserMinus className="h-4 w-4" />
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                asChild
                                                                className="text-green-600 hover:text-green-700"
                                                            >
                                                                <a href={route('admin.employees.edit', employee.id)}>
                                                                    <UserPlus className="h-4 w-4" />
                                                                </a>
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDeleteClick(employee)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {/* Pagination Info */}
                                {employees.total > employees.per_page && (
                                    <div className="flex items-center justify-between pt-4">
                                        <p className="text-sm text-muted-foreground">
                                            Menampilkan {employees.from} sampai {employees.to} dari {employees.total} karyawan
                                        </p>
                                        <div className="flex gap-2">
                                            {employees.prev_page_url && (
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={employees.prev_page_url}>Sebelumnya</a>
                                                </Button>
                                            )}
                                            {employees.next_page_url && (
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={employees.next_page_url}>Selanjutnya</a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-semibold">Tidak ada karyawan</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Mulai dengan menambahkan karyawan pertama Anda.</p>
                                <div className="mt-6">
                                    <Button asChild>
                                        <a href={route('admin.employees.create')}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Tambah Karyawan
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && handleDeleteCancel()}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Hapus Karyawan</DialogTitle>
                            <DialogDescription>
                                Apakah Anda yakin ingin menghapus karyawan <strong>{deleteDialog.employee?.name}</strong> (Kode:{' '}
                                {deleteDialog.employee?.employee_code})? Tindakan ini tidak dapat dibatalkan.
                                {deleteDialog.employee?.user && (
                                    <span className="mt-2 block text-orange-600">
                                        Catatan: Akun pengguna yang terkait akan dilepas namun tidak dihapus.
                                    </span>
                                )}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleDeleteCancel}>
                                Batal
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteConfirm}>
                                Hapus Karyawan
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Remove User Account Dialog */}
                <Dialog open={removeUserDialog.open} onOpenChange={(open) => !open && handleRemoveUserCancel()}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Hapus Akun Pengguna</DialogTitle>
                            <DialogDescription>
                                Apakah Anda yakin ingin menghapus akun pengguna untuk <strong>{removeUserDialog.employee?.name}</strong>? Data karyawan akan tetap ada, namun mereka tidak akan dapat masuk ke sistem lagi.
                                <span className="mt-2 block text-red-600">Tindakan ini tidak dapat dibatalkan.</span>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleRemoveUserCancel}>
                                Batal
                            </Button>
                            <Button variant="destructive" onClick={handleRemoveUserConfirm}>
                                Hapus Akun Pengguna
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
