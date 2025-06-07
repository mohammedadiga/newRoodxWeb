'use client';
import Image from 'next/image';
import Link from 'next/link';
// Redux
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
// Pages
import SearchButton from '@/pages/roodx/layout/header/search-button';
import NetefactionButton from '@/pages/roodx/layout/header/netefaction-button';
import CahtButton from '@/pages/roodx/layout/header/caht-button';
import NavUser from '@/pages/roodx/layout/user-button';
// Hooks
import { useSidebar } from '@/components/ui/sidebar';

export default function SiteHeader() {
  const { isMobile } = useSidebar();
  const { user } = useAppSelector((state: RootState) => state.user);
  return (
    <header dir="ltr" className="bg-primary backdrop-blur supports-[backdrop-filter]:dark:bg-primary/75  sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-4">
        <div className="flex items-center justify-center gap-2 lg:w-56">
          <div className="flex justify-center gap-2 ">
            <Link href="/" className="flex items-center gap-2 relative w-[120px] h-[38px] font-medium">
              <Image src="/images/logo-white.svg" alt="Roodx Logo" fill className="object-contain" />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <SearchButton />
          <NetefactionButton />
          <CahtButton />
          {isMobile && <NavUser user={user || {}} />}
        </div>
      </div>
    </header>
  );
}
