import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, Eye, EyeOff, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { initializeTheme } from '@/lib/theme';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        // Initialize theme on component mount
        initializeTheme();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 px-4">
            <Head title="Masuk" />

            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500">
                        <LogIn className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Selamat Datang Kembali</CardTitle>
                    <CardDescription>Masuk ke akun Anda untuk melanjutkan</CardDescription>
                </CardHeader>

                <CardContent>
                    {status && (
                        <Alert className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{status}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={submit} className="space-y-4">
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
                            {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
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
                                    autoComplete="current-password"
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
                            {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) => setData('remember', checked)}
                                />
                                <Label htmlFor="remember" className="text-sm">
                                    Ingat saya
                                </Label>
                            </div>

                            {canResetPassword && (
                                <Link href={route('password.request')} className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                    Lupa kata sandi?
                                </Link>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Sedang masuk...' : 'Masuk'}
                        </Button>
                    </form>

                    {/* <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Belum punya akun?{' '}
                            <Link href={route('register')} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                Daftar
                            </Link>
                        </p>
                    </div> */}

                    {/* Demo Credentials */}
                    <div className="mt-6 border-t pt-4">
                        <p className="mb-2 text-center text-xs text-muted-foreground">Kredensial Demo:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="rounded bg-blue-50 dark:bg-blue-900/30 p-2">
                                <p className="font-medium">Admin:</p>
                                <p>admin@kejati.go.id</p>
                                <p>admin123</p>
                            </div>
                            <div className="rounded bg-green-50 dark:bg-green-900/30 p-2">
                                <p className="font-medium">Pengguna:</p>
                                <p>user@kejati.go.id</p>
                                <p>user123</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
