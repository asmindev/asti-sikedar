import { UserSidebar } from '@/components/sidebar/user';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function UserLayout({ children }) {
    return (
        <SidebarProvider>
            <UserSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
