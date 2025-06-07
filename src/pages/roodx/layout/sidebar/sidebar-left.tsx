'use client';
import { usePathname } from 'next/navigation';
// Components
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
// Pages
import { NavMain } from '@/pages/roodx/layout/sidebar/nav-main';
import { NavUserStories } from '@/pages/roodx/layout/sidebar/nav-user-stories';
// Redux
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
// Icons
import { BriefcaseBusiness, Home, TvMinimalPlay, UserRound } from 'lucide-react';


export default function SidebarLeft({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const username = useAppSelector((state: RootState) => state.user.user?.username);

  const data = {
    navMain: [
      {
        title: 'home',
        url: '/home',
        icon: Home,
      },
      {
        title: 'job',
        url: '/job',
        icon: BriefcaseBusiness,
      },
      {
        title: 'video',
        url: '/video',
        icon: TvMinimalPlay,
      },
      {
        title: 'profile',
        url: `/${username}`,
        icon: UserRound,
      },
    ],
  };

  const pathname = usePathname() as string;
  // Automatically set isActive
  const navMainWithActive = data.navMain.map((item) => ({
    ...item,
    isActive: pathname.startsWith(item.url),
  }));
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithActive} />
        <NavUserStories />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
