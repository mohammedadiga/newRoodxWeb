'use client';
// Hooks
import useDirection from '@/hooks/useDirection';
// Components
import AuthGuard from '@/components/authGuard';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
// Pages
import SiteHeader from '@/pages/roodx/layout/header';
import SidebarLeft from '@/pages/roodx/layout/sidebar/sidebar-left';
import Breadcrumbs from '@/pages/roodx/layout/breadcrumbs';
import SidebarRight from '@/pages/roodx/layout/sidebar/sidebar-right';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isRTL } = useDirection();
  return (
    <AuthGuard>
      <div className="[--header-height:calc(--spacing(12))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <SidebarLeft side={isRTL ? 'right' : 'left'} />
            <SidebarInset>
              <Breadcrumbs />
              <div className="flex flex-1 flex-col p-4 pt-0 w-full max-w-7xl mx-auto transition-shadow">{children}</div>
            </SidebarInset>
            <SidebarRight side={!isRTL ? 'right' : 'left'} />
          </div>
        </SidebarProvider>
      </div>
    </AuthGuard>
  );
}
