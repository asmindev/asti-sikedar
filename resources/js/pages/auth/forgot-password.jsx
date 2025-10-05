import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4">
            <Head title="Lupa Kata Sandi" />

            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
                        <Mail className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Lupa Kata Sandi</CardTitle>
                    <CardDescription>Masukkan email Anda untuk menerima tautan reset kata sandi</CardDescription>
                </CardHeader>

                <CardContent>
                    {status && (
                        <Alert className="mb-4">
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-700">{status}</AlertDescription>
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
                                placeholder="Masukkan alamat email Anda"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Mengirim...' : 'Kirim Tautan Reset'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href={route('login')} className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500">
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Kembali ke Masuk
                        </Link>
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <div className="rounded-lg bg-blue-50 p-3">
                            <h4 className="mb-1 text-sm font-medium text-blue-900">Butuh Bantuan?</h4>
                            <p className="text-xs text-blue-700">
                                Jika Anda tidak menerima email dalam beberapa menit, silakan periksa folder spam atau hubungi administrator.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
