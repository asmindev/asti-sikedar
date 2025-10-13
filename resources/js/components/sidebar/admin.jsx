import { Link, usePage } from '@inertiajs/react';
import { BarChart3, LayoutDashboard, LogOut, Monitor, Moon, Palette, Settings, Sun, Upload, Users, Brain } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { getCurrentDarkMode, getEffectiveDarkMode, setDarkMode } from '@/lib/theme';
import { useEffect, useState } from 'react';

// Menu items for admin
const menuItems = [
    {
        title: 'Dasbor',
        url: route('admin.dashboard'),
        icon: LayoutDashboard,
        urlPattern: '/admin/dashboard',
    },
    {
        title: 'Manajemen Karyawan',
        url: route('admin.employees.index'),
        icon: Users,
        urlPattern: '/admin/employees',
    },
    {
        title: 'Manajemen Kuis',
        url: route('admin.quiz-management.index'),
        icon: Brain,
        urlPattern: '/admin/quiz-management',
    },
    {
        title: 'Kuesioner',
        url: route('admin.questionnaires.index'),
        icon: Upload,
        urlPattern: '/admin/questionnaires',
    },
    {
        title: 'Analisis Kluster',
        url: route('admin.clusters.analysis'),
        icon: BarChart3,
        urlPattern: '/admin/clusters',
    },
];

const systemItems = [
    {
        title: 'Pengaturan',
        icon: Settings,
        urlPattern: '/admin/settings',
        children: [
            {
                title: 'Tema',
                icon: Palette,
                urlPattern: '/admin/settings/theme',
                href: route('admin.settings.theme'),
            },
        ],
    },
];

export function AdminSidebar() {
    const { props, url } = usePage();
    const user = props.auth.user;
    const [darkMode, setDarkModeState] = useState('system');

    useEffect(() => {
        setDarkModeState(getCurrentDarkMode());
    }, []);

    const toggleDarkMode = () => {
        const currentMode = getCurrentDarkMode();
        let nextMode;

        if (currentMode === 'light') {
            nextMode = 'dark';
        } else if (currentMode === 'dark') {
            nextMode = 'system';
        } else {
            nextMode = 'light';
        }

        setDarkMode(nextMode);
        setDarkModeState(nextMode);
    };

    const getDarkModeIcon = () => {
        if (darkMode === 'system') {
            return <Monitor className="h-4 w-4" />;
        }
        const effectiveMode = getEffectiveDarkMode();
        return effectiveMode === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
    };

    return (
        <Sidebar className="border-r">
            <SidebarHeader className="border-b p-3">
                <div className="flex items-center gap-x-3">
                    <div className="flex size-10 items-center justify-center rounded">
                        <img src="/images/logo.png" alt="Logo Kejati" className="size-8 object-contain" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Panel Admin</h2>
                        <p className="text-xs text-muted-foreground">Sistem Manajemen</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                // URL starts with pattern (exact for dashboard, starts with for others)
                                const isActive = item.title === 'Dashboard' ? url === item.urlPattern : url.startsWith?.(item.urlPattern);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <Link
                                                href={item.url}
                                                className={`${
                                                    isActive ? 'bg-primary font-medium text-primary-foreground' : 'hover:bg-muted'
                                                } transition-colors duration-200`}
                                            >
                                                <item.icon className={`h-4 w-4`} />
                                                <span>{item.title}</span>
                                                {isActive && <div className="ml-auto h-2 w-2 rounded-full bg-primary-foreground" />}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Sistem</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {systemItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    {item.children ? (
                                        <Collapsible className="group/collapsible">
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton isActive={item.children.some((child) => url.startsWith(child.urlPattern))}>
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                    <svg
                                                        className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.children.map((child) => (
                                                        <SidebarMenuSubItem key={child.title}>
                                                            <SidebarMenuSubButton asChild isActive={url.startsWith(child.urlPattern)}>
                                                                <Link href={child.href}>
                                                                    <child.icon className="h-4 w-4" />
                                                                    <span>{child.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuButton asChild isActive={url.startsWith(item.urlPattern)}>
                                            <Link href={item.url}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
                <div className="mb-3 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-xs">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{user?.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Button onClick={toggleDarkMode} variant="outline" size="sm" className="w-full" title="Toggle dark mode">
                        {getDarkModeIcon()}
                        <span className="ml-2 text-xs">{darkMode === 'system' ? 'Otomatis' : darkMode === 'dark' ? 'Gelap' : 'Terang'}</span>
                    </Button>

                    <Button asChild size="sm" variant="outline" className="w-full">
                        <Link href={route('logout')} method="post">
                            <LogOut className="mr-2 h-4 w-4" />
                            Keluar
                        </Link>
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
