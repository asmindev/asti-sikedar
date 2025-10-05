import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, useForm } from '@inertiajs/react';
import { CheckCircle, Mail, RefreshCw } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-50 to-teal-100 px-4">
            <Head title="Verifikasi Email" />

            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600">
                        <Mail className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Verifikasi Email Anda</CardTitle>
                    <CardDescription>Kami telah mengirim tautan verifikasi ke alamat email Anda</CardDescription>
                </CardHeader>

                <CardContent>
                    {status === 'verification-link-sent' && (
                        <Alert className="mb-4">
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-700">
                                Tautan verifikasi baru telah dikirim ke alamat email Anda.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="mb-6 text-sm text-muted-foreground">
                        <p>
                            Sebelum melanjutkan, silakan periksa email Anda untuk tautan verifikasi. Jika Anda tidak menerima email, klik tombol di bawah untuk meminta yang lain.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <form onSubmit={submit}>
                            <Button type="submit" className="w-full" disabled={processing} variant="outline">
                                {processing ? (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                        Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Kirim Ulang Email Verifikasi
                                    </>
                                )}
                            </Button>
                        </form>

                        <Button asChild variant="ghost" className="w-full">
                            <Link href={route('logout')} method="post">
                                Keluar
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <div className="rounded-lg bg-blue-50 p-3">
                            <h4 className="mb-1 text-sm font-medium text-blue-900">Tidak menerima email?</h4>
                            <ul className="space-y-1 text-xs text-blue-700">
                                <li>• Periksa folder spam/junk</li>
                                <li>• Pastikan alamat email sudah benar</li>
                                <li>• Tunggu beberapa menit sebelum meminta yang lain</li>
                                <li>• Hubungi dukungan jika masalah berlanjut</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
