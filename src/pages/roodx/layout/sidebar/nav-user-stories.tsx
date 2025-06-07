// Components
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function NavUserStories() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Stories</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2"></SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
