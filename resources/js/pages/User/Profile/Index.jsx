import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UserLayout from '@/layouts/UserLayout';
import { Head, useForm } from '@inertiajs/react';
import { Save, User } from 'lucide-react';

export default function UserProfile({ user }) {
    const breadcrumbs = [{ label: 'Dasbor', href: route('user.dashboard') }, { label: 'Pengaturan Profil' }];

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('user.profile.update'));
    };

    return (
        <UserLayout breadcrumbs={breadcrumbs}>
            <Head title="Profil" />

            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Pengaturan Profil</h1>
                    <p className="text-muted-foreground">Kelola informasi pribadi Anda</p>
                </div>{' '}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5" />
                                Informasi Pribadi
                            </CardTitle>
                            <CardDescription>Perbarui detail pribadi Anda</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-2"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="email">Alamat Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-2"
                                        required
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="password">Kata Sandi Baru (Opsional)</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="mt-2"
                                        placeholder="Biarkan kosong untuk mempertahankan kata sandi saat ini"
                                    />
                                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="password_confirmation">Konfirmasi Kata Sandi</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="mt-2"
                                        placeholder="Konfirmasi kata sandi baru"
                                    />
                                    {errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>}
                                </div>

                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Akun</CardTitle>
                            <CardDescription>Detail dan status akun Anda</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Tipe Akun:</span>
                                    <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800 capitalize">{user.role}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Anggota Sejak:</span>
                                    <span className="text-sm">{new Date(user.created_at).toLocaleDateString()}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Email Terverifikasi:</span>
                                    <span className="text-sm">
                                        {user.email_verified_at ? (
                                            <span className="text-green-600">✓ Terverifikasi</span>
                                        ) : (
                                            <span className="text-red-600">Belum terverifikasi</span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </UserLayout>
    );
}
