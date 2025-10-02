import { Link, usePage } from '@inertiajs/react';
import { Home, LogOut, Settings, User, UserCircle, FileText, ClipboardCheck } from 'lucide-react';

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

export function UserSidebar() {
    const { props, url } = usePage();
    const user = props.auth.user;

    const menuItems = [
        {
            title: 'Dashboard',
            icon: Home,
            urlPattern: '/dashboard',
            href: '/dashboard',
        },
        {
            title: 'Kuesioner',
            icon: FileText,
            urlPattern: '/user/quiz',
            children: [
                {
                    title: 'Isi Kuesioner',
                    urlPattern: '/user/quiz',
                    href: '/user/quiz',
                },
                {
                    title: 'Lihat Jawaban',
                    urlPattern: '/user/quiz/result',
                    href: '/user/quiz/result',
                },
                {
                    title: 'Hasil Assessment',
                    urlPattern: '/user/results',
                    href: '/user/results',
                },
            ],
        },
    ];

    const systemItems = [
        {
            title: 'Profile',
            icon: User,
            urlPattern: '/user/profile',
            href: '/user/profile',
        },
        // {
        //     title: 'Settings',
        //     icon: Settings,
        //     urlPattern: '/user/settings',
        //     href: '/user/settings',
        // },
    ];

    return (
        <Sidebar className="border-r">
            <SidebarHeader className="border-b p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-green-600">
                        <UserCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">User Panel</h2>
                        <p className="text-xs text-muted-foreground">Personal Dashboard</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
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
                                            <Link href={item.href}>
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

                <SidebarGroup>
                    <SidebarGroupLabel>System</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {systemItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={url.startsWith(item.urlPattern)}>
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
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
                        <p className="text-xs text-green-600 capitalize">{user?.role}</p>
                    </div>
                </div>

                <Button asChild size="sm" variant="outline" className="w-full">
                    <Link href={route('logout')} method="post">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Link>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
