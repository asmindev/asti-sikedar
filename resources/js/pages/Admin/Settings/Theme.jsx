import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/AdminLayout';
import { getAllThemeColors, getCurrentDarkMode, getCurrentTheme, setDarkMode, setTheme } from '@/lib/theme';
import { Head } from '@inertiajs/react';
import { Check, Monitor, Moon, Palette, Sparkles, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeSettings() {
    const [currentTheme, setCurrentTheme] = useState('theme-blue');
    const [currentDarkMode, setCurrentDarkMode] = useState('system');
    const [isChanging, setIsChanging] = useState(false);
    const themeColors = getAllThemeColors();

    useEffect(() => {
        setCurrentTheme(getCurrentTheme());
        setCurrentDarkMode(getCurrentDarkMode());
    }, []);

    const handleThemeChange = async (themeKey) => {
        setIsChanging(true);

        // Add a small delay for smooth transition
        setTimeout(() => {
            setTheme(themeKey);
            setCurrentTheme(themeKey);
            setIsChanging(false);
        }, 150);
    };

    const handleDarkModeChange = (mode) => {
        setDarkMode(mode);
        setCurrentDarkMode(mode);
    };

    const breadcrumbs = [{ label: 'Dasbor', href: route('admin.dashboard') }, { label: 'Pengaturan', href: '#' }, { label: 'Kustomisasi Tema' }];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Tema" />

            <div className="container mx-auto max-w-6xl space-y-8 p-6">
                {/* Header Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
                            <Palette className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">Kustomisasi Tema</h1>
                            <p className="text-muted-foreground">Personalisasi panel admin Anda dengan tema warna yang indah</p>
                        </div>
                    </div>
                    <Separator />
                </div>

                {/* Current Theme Info */}
                <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                    Tema Aktif Saat Ini
                                </CardTitle>
                                <CardDescription>Tema yang dipilih memengaruhi seluruh antarmuka admin</CardDescription>
                            </div>
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                                Aktif
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {themeColors.map(
                            (theme) =>
                                currentTheme === theme.key && (
                                    <div key={theme.key} className="flex items-center space-x-4">
                                        {/* Color Preview */}
                                        <div className="flex space-x-2">
                                            <div
                                                className={`h-8 w-8 rounded-lg border-2 border-white shadow-lg ${theme.colorClass}`}
                                                title="Warna Utama"
                                            />
                                            <div
                                                className={`h-8 w-8 rounded-lg border-2 border-white shadow-lg ${theme.secondaryClass}`}
                                                title="Warna Sekunder"
                                            />
                                            <div
                                                className={`h-8 w-8 rounded-lg border-2 border-white shadow-lg ${theme.accentClass}`}
                                                title="Warna Aksen"
                                            />
                                        </div>

                                        {/* Theme Info */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{theme.name}</h3>
                                            <p className="text-sm text-muted-foreground">{theme.description}</p>
                                        </div>
                                    </div>
                                ),
                        )}
                    </CardContent>
                </Card>

                {/* Theme Selection */}
                <div className="space-y-6">
                    <div>
                        <h2 className="mb-2 text-xl font-semibold">Tema yang Tersedia</h2>
                        <p className="mb-6 text-sm text-muted-foreground">
                            Pilih dari palet warna yang dirancang dengan hati-hati untuk pengalaman pengguna optimal
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {themeColors.map((theme) => {
                            const isActive = currentTheme === theme.key;

                            return (
                                <Card
                                    key={theme.key}
                                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                        isActive ? 'border-primary/50 shadow-lg ring-2 ring-primary' : 'hover:border-primary/30'
                                    } ${isChanging ? 'pointer-events-none opacity-50' : ''}`}
                                    onClick={() => !isActive && handleThemeChange(theme.key)}
                                >
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg font-semibold">{theme.name}</CardTitle>
                                            {isActive && (
                                                <Badge variant="default" className="bg-primary">
                                                    <Check className="mr-1 h-3 w-3" />
                                                    Aktif
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription className="text-xs">{theme.description}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        {/* Large Color Preview */}
                                        <div className="space-y-3">
                                            <div className="flex space-x-2">
                                                <div
                                                    className={`h-16 flex-1 rounded-lg border shadow-sm ${theme.colorClass} flex items-center justify-center`}
                                                >
                                                    <span className="text-xs font-medium text-white">Utama</span>
                                                </div>
                                                <div className="space-y-2">
                                                    <div
                                                        className={`h-7 w-14 rounded border shadow-sm ${theme.secondaryClass} flex items-center justify-center`}
                                                    >
                                                        <span className="text-xs opacity-70">2nd</span>
                                                    </div>
                                                    <div
                                                        className={`h-7 w-14 rounded border shadow-sm ${theme.accentClass} flex items-center justify-center`}
                                                    >
                                                        <span className="text-xs opacity-70">Acc</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Theme Actions */}
                                        <div className="pt-2">
                                            {isActive ? (
                                                <Button disabled className="w-full" variant="default">
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Saat Ini Aktif
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    className="w-full hover:bg-primary hover:text-primary-foreground"
                                                    onClick={() => handleThemeChange(theme.key)}
                                                >
                                                    <Palette className="mr-2 h-4 w-4" />
                                                    Terapkan Tema
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Additional Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor className="h-5 w-5" />
                            Preferensi Tampilan
                        </CardTitle>
                        <CardDescription>Sesuaikan tampilan antarmuka Anda</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Dark Mode Settings */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="mb-2 text-sm font-medium">Mode Tampilan</h4>
                                <p className="mb-4 text-xs text-muted-foreground">
                                    Pilih bagaimana antarmuka harus muncul atau biarkan mengikuti preferensi sistem Anda
                                </p>
                            </div>

                            <div className="grid gap-3 md:grid-cols-3">
                                {/* Light Mode */}
                                <Card
                                    className={`cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                                        currentDarkMode === 'light' ? 'border-primary ring-1 ring-primary/20' : ''
                                    }`}
                                    onClick={() => handleDarkModeChange('light')}
                                >
                                    <CardContent className="space-y-3 p-4 text-center">
                                        <div className="flex justify-center">
                                            <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900">
                                                <Sun className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-medium">Mode Terang</h5>
                                            <p className="text-xs text-muted-foreground">Antarmuka terang dan bersih</p>
                                        </div>
                                        {currentDarkMode === 'light' && (
                                            <Badge variant="default" className="text-xs">
                                                <Check className="mr-1 h-3 w-3" />
                                                Aktif
                                            </Badge>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Dark Mode */}
                                <Card
                                    className={`cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                                        currentDarkMode === 'dark' ? 'border-primary ring-1 ring-primary/20' : ''
                                    }`}
                                    onClick={() => handleDarkModeChange('dark')}
                                >
                                    <CardContent className="space-y-3 p-4 text-center">
                                        <div className="flex justify-center">
                                            <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                                                <Moon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-medium">Mode Gelap</h5>
                                            <p className="text-xs text-muted-foreground">Mudah pada mata</p>
                                        </div>
                                        {currentDarkMode === 'dark' && (
                                            <Badge variant="default" className="text-xs">
                                                <Check className="mr-1 h-3 w-3" />
                                                Aktif
                                            </Badge>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* System Mode */}
                                <Card
                                    className={`cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                                        currentDarkMode === 'system' ? 'border-primary ring-1 ring-primary/20' : ''
                                    }`}
                                    onClick={() => handleDarkModeChange('system')}
                                >
                                    <CardContent className="space-y-3 p-4 text-center">
                                        <div className="flex justify-center">
                                            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                                                <Monitor className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-medium">Sistem</h5>
                                            <p className="text-xs text-muted-foreground">Ikuti pengaturan perangkat</p>
                                        </div>
                                        {currentDarkMode === 'system' && (
                                            <Badge variant="default" className="text-xs">
                                                <Check className="mr-1 h-3 w-3" />
                                                Aktif
                                            </Badge>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <Separator />

                        {/* Future Features */}
                        <div className="flex items-center justify-between rounded-lg border p-4 opacity-50">
                            <div className="space-y-1">
                                <h4 className="font-medium">Warna Kustom</h4>
                                <p className="text-sm text-muted-foreground">Buat palet warna Anda sendiri (Segera Hadir)</p>
                            </div>
                            <Button variant="outline" size="sm" disabled>
                                <Palette className="mr-2 h-4 w-4" />
                                Kustomisasi
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Help Section */}
                <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                        <div className="space-y-2 text-center">
                            <h3 className="font-semibold">💡 Tips Pro</h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <p>• Perubahan tema dan mode gelap diterapkan secara instan dan disimpan secara otomatis</p>
                                <p>• Mode sistem mengikuti preferensi tampilan sistem operasi Anda</p>
                                <p>• Semua perubahan dipertahankan di seluruh sesi browser</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
