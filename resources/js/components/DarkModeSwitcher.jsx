import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { darkModeNames, getCurrentDarkMode, getEffectiveDarkMode, setDarkMode } from '@/lib/theme';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DarkModeSwitcher({ variant = 'outline', size = 'sm' }) {
    const [currentMode, setCurrentMode] = useState('system');
    const [effectiveMode, setEffectiveMode] = useState('light');

    useEffect(() => {
        const mode = getCurrentDarkMode();
        const effective = getEffectiveDarkMode();
        setCurrentMode(mode);
        setEffectiveMode(effective);

        // Listen for system dark mode changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (getCurrentDarkMode() === 'system') {
                setEffectiveMode(getEffectiveDarkMode());
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const handleModeChange = (mode) => {
        setDarkMode(mode);
        setCurrentMode(mode);
        setEffectiveMode(getEffectiveDarkMode());
    };

    const getCurrentIcon = () => {
        if (currentMode === 'system') {
            return <Monitor className="h-4 w-4" />;
        }
        return effectiveMode === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
    };

    const modes = [
        {
            key: 'light',
            name: 'Light Mode',
            icon: Sun,
            description: 'Bright and clean interface',
        },
        {
            key: 'dark',
            name: 'Dark Mode',
            icon: Moon,
            description: 'Easy on the eyes',
        },
        {
            key: 'system',
            name: 'System',
            icon: Monitor,
            description: 'Follow device setting',
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={variant} size={size} className="w-full">
                    {getCurrentIcon()}
                    <span className="ml-2">
                        {currentMode === 'system' ? `Auto (${effectiveMode === 'dark' ? 'Dark' : 'Light'})` : darkModeNames[currentMode]}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Appearance Mode</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {modes.map((mode) => {
                    const Icon = mode.icon;
                    const isActive = currentMode === mode.key;

                    return (
                        <DropdownMenuItem
                            key={mode.key}
                            onClick={() => handleModeChange(mode.key)}
                            className={`cursor-pointer transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                        >
                            <div className="flex w-full items-center space-x-3">
                                <Icon className="h-4 w-4" />
                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium">{mode.name}</div>
                                    <div className="truncate text-xs text-muted-foreground">{mode.description}</div>
                                </div>
                                {isActive && <div className="ml-2 h-2 w-2 rounded-full bg-current" />}
                            </div>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
