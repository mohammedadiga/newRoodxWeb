'use client';
import Link from 'next/link';
// Components
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
// Icon
import { LucideIcon } from 'lucide-react';
// i18n
import { useTranslations } from 'next-intl';

interface Props {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive: boolean;
  }[];
}

export function NavMain({ items, ...props }: Props) {
  const t = useTranslations('Sidebar');
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="flex items-center gap-2">
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`min-w-8 duration-200 h-10 ease-linear ${item.isActive ? 'bg-primary hover:bg-primary/90 text-white hover:text-white' : ' hover:bg-secondary '} active:bg-secondary/90`}
              >
                <Link href={item.url} className="flex items-center gap-2 w-full">
                  {item.icon && <item.icon className="w-6 h-6" />}
                  <span>{t(item.title)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
