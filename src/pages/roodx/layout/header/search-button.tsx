// Components
import { Button } from '@/components/ui/button';
// Icons
import { Search } from 'lucide-react';

export default function SearchButton() {
  return (
    <>
      {/* Show on lg and up */}
      <Button variant='outline' className="hidden lg:flex justify-start rounded-md w-50 cursor-text">
        <Search className="h-5 w-5" />
        <span>Search...</span>
      </Button>

      {/* Show only below lg */}
      <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
    </>
  );
}
