import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Save, UserCheck } from 'lucide-react';
import { useState } from 'react';

export default function EmployeeEdit({ employee }) {
    const { flash } = usePage().props;
    const breadcrumbs = [
        { label: 'Dasbor', href: route('admin.dashboard') },
        { label: 'Manajemen Karyawan', href: route('admin.employees.index') },
        { label: `Edit ${employee.name}` },
    ];

    const [createUserAccount, setCreateUserAccount] = useState(!!employee.user);

    const { data, setData, put, processing, errors } = useForm({
        name: employee.name || '',
        position: employee.position || '',
        gender: employee.gender || '',
        phone: employee.phone || '',
        address: employee.address || '',
        create_user_account: !!employee.user,
        email: employee.user?.email || null,
        password: null,
        password_confirmation: null,
        role: employee.user?.role || 'user',
        birth_date: employee.birth_date || null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare data, exclude empty user account fields if not creating user account
        const submitData = { ...data };
        if (!data.create_user_account) {
            delete submitData.email;
            delete submitData.password;
            delete submitData.password_confirmation;
            delete submitData.role;
        }

        console.log('Update form submitted with data:', submitData);
        put(route('admin.employees.update', employee.id), {
            data: submitData,
            onSuccess: () => {
                console.log('Update successful');
            },
            onError: (errors) => {
                console.log('Update errors:', errors);
            },
        });
    };

    const toggleUserAccount = (checked) => {
        setCreateUserAccount(checked);
        setData((prevData) => ({
            ...prevData,
            create_user_account: checked,
            // Reset user fields if unchecked
            ...(!checked && {
                email: null,
                password: null,
                password_confirmation: null,
                role: 'user',
            }),
        }));
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Karyawan - ${employee.name}`} />

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
                        <h1 className="text-3xl font-bold tracking-tight">Edit Karyawan</h1>
                        <p className="text-muted-foreground">Perbarui informasi karyawan dan kelola akun pengguna</p>
                    </div>
                    <Button variant="outline" asChild>
                        <a href={route('admin.employees.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Daftar
                        </a>
                    </Button>
                </div>

                <div className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Employee Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <UserCheck className="mr-2 h-5 w-5" />
                                    Informasi Karyawan
                                </CardTitle>
                                <CardDescription>Perbarui detail pribadi dan profesional karyawan</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Nama Lengkap <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Nama lengkap karyawan"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    {/* Gender */}
                                    <div className="space-y-2">
                                        <Label htmlFor="gender">
                                            Jenis Kelamin <span className="text-red-500">*</span>
                                        </Label>
                                        <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                            <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                                <SelectItem value="Perempuan">Perempuan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                                    </div>

                                    {/* Birth Date */}
                                    <div className="space-y-2">
                                        <Label htmlFor="birth_date">
                                            Tanggal Lahir
                                        </Label>
                                        <Input
                                            id="birth_date"
                                            type="date"
                                            value={data.birth_date}
                                            onChange={(e) => setData('birth_date', e.target.value)}
                                            className={errors.birth_date ? 'border-red-500' : ''}
                                        />
                                        {errors.birth_date && <p className="text-sm text-red-500">{errors.birth_date}</p>}
                                    </div>

                                    {/* Position */}
                                    <div className="space-y-2">
                                        <Label htmlFor="position">
                                            Posisi <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="position"
                                            type="text"
                                            value={data.position}
                                            onChange={(e) => setData('position', e.target.value)}
                                            placeholder="contoh: Manajer HR"
                                            className={errors.position ? 'border-red-500' : ''}
                                        />
                                        {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Nomor Telepon</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="contoh: +62 812 3456 7890"
                                            className={errors.phone ? 'border-red-500' : ''}
                                        />
                                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Address - Full width outside grid */}
                                <div className="space-y-2">
                                    <Label htmlFor="address mt-2">Alamat</Label>
                                    <Textarea
                                        id="address"
                                        rows={3}
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Alamat karyawan"
                                        className={errors.address ? 'border-red-500' : ''}
                                    />
                                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* User Account Section */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <Checkbox id="create_user_account" checked={createUserAccount} onCheckedChange={toggleUserAccount} />
                                    <div>
                                        <CardTitle className="flex items-center text-lg">
                                            {employee.user && <UserCheck className="mr-2 h-5 w-5 text-green-600" />}
                                            {employee.user ? 'Perbarui Akun Pengguna' : 'Buat Akun Pengguna'}
                                        </CardTitle>
                                        <CardDescription>
                                            {employee.user
                                                ? 'Kelola akun pengguna yang sudah ada untuk karyawan ini'
                                                : 'Centang opsi ini untuk membuat akun pengguna yang memungkinkan karyawan masuk ke sistem'}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            {createUserAccount && (
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* Email */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email">
                                                Alamat Email <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email || ''}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="pengguna@contoh.com"
                                                className={errors.email ? 'border-red-500' : ''}
                                            />
                                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                        </div>

                                        {/* Role */}
                                        <div className="space-y-2">
                                            <Label htmlFor="role">
                                                Peran <span className="text-red-500">*</span>
                                            </Label>
                                            <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                                <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="Pilih peran" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="user">Pengguna</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-2">
                                            <Label htmlFor="password">
                                                Kata Sandi {!employee.user && <span className="text-red-500">*</span>}
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={data.password || ''}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder={employee.user ? 'Biarkan kosong jika tidak ingin mengubah' : 'Minimal 8 karakter'}
                                                className={errors.password ? 'border-red-500' : ''}
                                            />
                                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                        </div>

                                        {/* Password Confirmation */}
                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation">
                                                Konfirmasi Kata Sandi {!employee.user && <span className="text-red-500">*</span>}
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                value={data.password_confirmation || ''}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="Ulangi kata sandi"
                                                className={errors.password_confirmation ? 'border-red-500' : ''}
                                            />
                                            {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-4 border-t pt-6">
                            <Button type="button" variant="outline" asChild>
                                <a href={route('admin.employees.index')}>Batal</a>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
