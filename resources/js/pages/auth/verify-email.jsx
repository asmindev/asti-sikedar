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
            <Head title="Email Verification" />

            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600">
                        <Mail className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
                    <CardDescription>We've sent a verification link to your email address</CardDescription>
                </CardHeader>

                <CardContent>
                    {status === 'verification-link-sent' && (
                        <Alert className="mb-4">
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-700">
                                A new verification link has been sent to your email address.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="mb-6 text-sm text-muted-foreground">
                        <p>
                            Before continuing, please check your email for a verification link. If you didn't receive the email, click the button
                            below to request another.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <form onSubmit={submit}>
                            <Button type="submit" className="w-full" disabled={processing} variant="outline">
                                {processing ? (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Resend Verification Email
                                    </>
                                )}
                            </Button>
                        </form>

                        <Button asChild variant="ghost" className="w-full">
                            <Link href={route('logout')} method="post">
                                Logout
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <div className="rounded-lg bg-blue-50 p-3">
                            <h4 className="mb-1 text-sm font-medium text-blue-900">Didn't receive the email?</h4>
                            <ul className="space-y-1 text-xs text-blue-700">
                                <li>• Check your spam/junk folder</li>
                                <li>• Make sure the email address is correct</li>
                                <li>• Wait a few minutes before requesting another</li>
                                <li>• Contact support if issues persist</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
