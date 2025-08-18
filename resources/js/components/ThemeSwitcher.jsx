import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAllThemeColors, getCurrentTheme, setTheme } from '@/lib/theme';
import { Palette } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
    const [currentTheme, setCurrentTheme] = useState('theme-blue');
    const themeColors = getAllThemeColors();

    useEffect(() => {
        setCurrentTheme(getCurrentTheme());
    }, []);

    const handleThemeChange = (theme) => {
        setTheme(theme);
        setCurrentTheme(theme);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                    <Palette className="mr-2 h-4 w-4" />
                    Theme
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Choose Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {themeColors.map((theme) => (
                    <DropdownMenuItem
                        key={theme.key}
                        onClick={() => handleThemeChange(theme.key)}
                        className={`cursor-pointer transition-colors ${
                            currentTheme === theme.key ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                        }`}
                    >
                        <div className="flex w-full items-center space-x-3">
                            {/* Color Preview */}
                            <div className="flex space-x-1">
                                <div className={`h-4 w-4 rounded-full border border-border ${theme.colorClass}`} title="Primary Color" />
                                <div className={`h-4 w-4 rounded-full border border-border ${theme.secondaryClass}`} title="Secondary Color" />
                                <div className={`h-4 w-4 rounded-full border border-border ${theme.accentClass}`} title="Accent Color" />
                            </div>

                            {/* Theme Info */}
                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium">{theme.name}</div>
                                <div className="truncate text-xs text-muted-foreground">{theme.description}</div>
                            </div>

                            {/* Active Indicator */}
                            {currentTheme === theme.key && <div className="ml-2 h-2 w-2 rounded-full bg-current" />}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
