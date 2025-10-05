import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
            <Head title="Daftar" />

            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                        <UserPlus className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Buat Akun</CardTitle>
                    <CardDescription>Daftar untuk memulai menggunakan sistem</CardDescription>
                </CardHeader>

                <CardContent>
                    <Alert className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>Akun baru dibuat dengan peran "Pengguna" secara default</AlertDescription>
                    </Alert>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-2"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email">Alamat Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password">Kata Sandi</Label>
                            <div className="relative mt-2">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="pr-10"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">Konfirmasi Kata Sandi</Label>
                            <div className="relative mt-2">
                                <Input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="pr-10"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                            {errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Membuat akun...' : 'Buat Akun'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Sudah punya akun?{' '}
                            <Link href={route('login')} className="font-medium text-green-600 hover:text-green-500">
                                Masuk
                            </Link>
                        </p>
                    </div>

                    {/* Role Information */}
                    <div className="mt-6 border-t pt-4">
                        <div className="rounded-lg bg-blue-50 p-3">
                            <h4 className="text-sm font-medium text-blue-900">Tipe Akun:</h4>
                            <div className="mt-2 space-y-1 text-xs text-blue-700">
                                <p>
                                    • <strong>Pengguna:</strong> Akses ke dasbor, profil, dan lihat hasil
                                </p>
                                <p>
                                    • <strong>Admin:</strong> Akses sistem penuh (hubungi admin untuk upgrade)
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
