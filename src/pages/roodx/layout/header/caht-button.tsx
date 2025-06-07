// Components
import { Button } from '@/components/ui/button';
// Icons
import { MessageSquare } from 'lucide-react';

export default function CahtButton() {
  return (
    <Button size="icon" className="rounded-full bg-primary/30 hover:bg-accent/20 dark:hover:bg-input/50">
      <MessageSquare className="h-5 w-5 text-white" />
      <span className="sr-only">Chat</span>
    </Button>
  );
}
