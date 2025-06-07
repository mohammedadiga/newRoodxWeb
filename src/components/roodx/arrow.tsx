// Components
import { Button } from '@/components/ui/button';
// Icons
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function Arrow({ onBack }: Props) {
  return (
    <Button variant="outline" size="icon" className="flex items-center justify-center" onClick={() => onBack()}>
      <ArrowLeft width={20} height={20} className="rtl:rotate-180" />
    </Button>
  );
}
