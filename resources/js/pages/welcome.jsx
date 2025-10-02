import { DarkModeSwitcher } from '@/components/DarkModeSwitcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { initializeTheme } from '@/lib/theme';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BarChart3, Shield, Sparkles, Users } from 'lucide-react';
import { useEffect } from 'react';

export default function Welcome() {
    useEffect(() => {
        initializeTheme();
    }, []);

    const features = [
        {
            icon: BarChart3,
            title: 'Analisis Data',
            description: 'Algoritma pengelompokan canggih untuk analisis perilaku karyawan',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Users,
            title: 'Manajemen Karyawan',
            description: 'Manajemen dan pelacakan data karyawan yang komprehensif',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: Shield,
            title: 'Akses Aman',
            description: 'Kontrol akses berbasis peran dengan panel admin dan pengguna',
            gradient: 'from-purple-500 to-violet-500',
        },
    ];

    return (
        <>
            <Head title="Selamat Datang" />

            {/* Background with animated gradient */}
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-primary/10 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-green-500/10 blur-3xl delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-purple-500/5 blur-3xl delay-500"></div>
                </div>

                {/* Header */}
                <header className="relative z-10 p-4 md:p-6">
                    <div className="container mx-auto flex max-w-7xl items-center justify-between gap-4">
                        <div className="flex min-w-0 flex-1 items-center space-x-3">
                            <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary to-primary/80 p-2">
                                <Sparkles className="h-5 w-5 text-primary-foreground md:h-6 md:w-6" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h1 className="truncate text-lg font-bold text-foreground md:text-xl">ASTI Analytics</h1>
                                <p className="truncate text-xs text-muted-foreground md:text-sm">Sistem Analisis Karyawan</p>
                            </div>
                        </div>

                        <div className="flex flex-shrink-0 items-center space-x-2 md:space-x-4">
                            <div className="hidden sm:block">
                                <DarkModeSwitcher variant="outline" size="sm" />
                            </div>
                            <Button asChild variant="outline" size="sm" className="text-sm">
                                <Link href="/login">Masuk</Link>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="relative z-10 flex-1 px-6">
                    <div className="container mx-auto max-w-7xl">
                        {/* Hero Section */}
                        <section className="py-20 text-center">
                            <div className="mx-auto max-w-4xl space-y-8">
                                {/* Hero Icon */}
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 p-6 shadow-2xl">
                                            <BarChart3 className="h-16 w-16 text-primary-foreground" />
                                        </div>
                                        <div className="absolute -inset-2 animate-pulse rounded-3xl bg-gradient-to-br from-primary/20 to-transparent blur"></div>
                                    </div>
                                </div>

                                {/* Hero Text */}
                                <div className="space-y-6">
                                    <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                                        <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                                            Analitik Cerdas
                                        </span>
                                    </h1>
                                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
                                        Sistem analisis perilaku karyawan canggih dengan algoritma pengelompokan yang kuat dan kemampuan manajemen data yang komprehensif.
                                    </p>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-gradient-to-r from-primary to-primary/90 px-8 py-6 text-lg shadow-xl hover:from-primary/90 hover:to-primary"
                                    >
                                        <Link href="/login">
                                            Mulai
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                    {/* <Button asChild variant="outline" size="lg" className="border-2 px-8 py-6 text-lg">
                                        <Link href="/register">Buat Akun</Link>
                                    </Button> */}
                                </div>
                            </div>
                        </section>

                        {/* Features Section */}
                        <section className="py-20">
                            <div className="mb-16 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Fitur Unggulan</h2>
                                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                    Semua yang Anda butuhkan untuk menganalisis dan mengelola data karyawan secara efektif
                                </p>
                            </div>

                            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                                {features.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <Card
                                            key={index}
                                            className="group border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl"
                                        >
                                            <CardContent className="space-y-6 p-8 text-center">
                                                <div className="flex justify-center">
                                                    <div
                                                        className={`rounded-2xl bg-gradient-to-br p-4 ${feature.gradient} shadow-lg transition-transform duration-500 group-hover:scale-110`}
                                                    >
                                                        <Icon className="h-8 w-8 text-white" />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                                                    <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Stats Section */}
                        <section className="py-20">
                            <Card className="border-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm">
                                <CardContent className="p-12">
                                    <div className="grid gap-8 text-center md:grid-cols-3">
                                        <div className="space-y-2">
                                            <div className="bg-gradient-to-br from-primary to-primary/80 bg-clip-text text-4xl font-bold text-transparent">
                                                K-Means
                                            </div>
                                            <div className="font-medium text-muted-foreground">Algoritma Pengelompokan</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="bg-gradient-to-br from-green-600 to-green-500 bg-clip-text text-4xl font-bold text-transparent">
                                                Multi-Panel
                                            </div>
                                            <div className="font-medium text-muted-foreground">Arsitektur Sistem</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="bg-gradient-to-br from-purple-600 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
                                                Role-Based
                                            </div>
                                            <div className="font-medium text-muted-foreground">Kontrol Akses</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 border-t bg-background/80 backdrop-blur-sm">
                    <div className="container mx-auto max-w-7xl px-6 py-8">
                        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className="rounded-lg bg-gradient-to-br from-primary to-primary/80 p-1.5">
                                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                                </div>
                                <span className="font-semibold text-foreground">ASTI Analytics</span>
                            </div>
                            <div className="text-sm text-muted-foreground">© 2025 ASTI Analytics. Dibangun dengan teknologi web modern.</div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
