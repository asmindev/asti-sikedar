import { Link, usePage } from '@inertiajs/react';
import { BarChart3, LayoutDashboard, LogOut, Settings, User, UserCircle } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/sidebar';

// Menu items for user
const menuItems = [
    {
        title: 'Dashboard',
        url: route('user.dashboard'),
        icon: LayoutDashboard,
        isActive: (pathname) => pathname === '/user/dashboard',
    },
    {
        title: 'My Profile',
        url: route('user.profile'),
        icon: User,
        isActive: (pathname) => pathname.startsWith('/user/profile'),
    },
    {
        title: 'My Results',
        url: route('user.results'),
        icon: BarChart3,
        isActive: (pathname) => pathname.startsWith('/user/results'),
    },
];

const systemItems = [
    {
        title: 'Settings',
        url: '#',
        icon: Settings,
    },
];

export function UserSidebar() {
    const { auth } = usePage().props;
    const user = auth.user;
    const currentPath = window.location.pathname;

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
                                    <SidebarMenuButton asChild isActive={item.isActive(currentPath)}>
                                        <Link href={item.url}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
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
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
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
