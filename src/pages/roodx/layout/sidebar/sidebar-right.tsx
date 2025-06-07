'use client';
// Components
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
// Redux
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
// Pages
import NavUser from '@/pages/roodx/layout/user-button';
// Hooks
import { useIsMobile } from '@/hooks/use-mobile';

export default function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAppSelector((state: RootState) => state.user);
  const isMobile = useIsMobile();
  return (
    <Sidebar collapsible={isMobile ? 'none' : undefined} className="top-(--header-height) h-[calc(100svh-var(--header-height))]! hidden border-l lg:flex" {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">{!isMobile && <NavUser user={user || {}} />}</SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
