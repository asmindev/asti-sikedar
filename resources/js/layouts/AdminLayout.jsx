import { AdminSidebar } from '@/components/sidebar/admin';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminLayout({ children, breadcrumbs = [] }) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset className="flex flex-col min-w-0">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 min-w-0">
                    <SidebarTrigger className="-ml-1" />
                    {breadcrumbs.length > 0 && (
                        <Breadcrumb className="min-w-0">
                            <BreadcrumbList>
                            {breadcrumbs.map((crumb, index) => (
                                <>
                                <BreadcrumbItem key={`item-${index}-${crumb.label.replace(/\s+/g, '-')}`}>
                                {index < breadcrumbs.length - 1 ? (
                                    <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                                    ) : (
                                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                    )}
                                    </BreadcrumbItem>
                                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator key={`separator-${index}`} />}
                                    </>
                                ))}
                                </BreadcrumbList>
                                </Breadcrumb>
                            )}
                            </header>
                            <div className="flex flex-1 flex-col gap-4 p-4 overflow-auto min-w-0">{children}</div>
                            </SidebarInset>
    </SidebarProvider>
);
}
