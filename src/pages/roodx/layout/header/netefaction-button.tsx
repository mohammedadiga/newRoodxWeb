// Components
import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// Icons
import { Bell } from 'lucide-react';

export default function NetefactionButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="rounded-full bg-primary/30 hover:bg-accent/20 dark:hover:bg-input/50">
          <Bell className="h-5 w-5 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem>الخيار 1</DropdownMenuItem>
        <DropdownMenuItem>الخيار 2</DropdownMenuItem>
        <DropdownMenuItem>الخيار 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
