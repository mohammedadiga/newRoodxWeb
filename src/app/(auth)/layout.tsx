'use client';
import Image from 'next/image';
import Link from 'next/link';
// Modules
import AuthGuard from '@/components/authGuard';
import { LanguageToggle } from '@/components/theme/LanguageToggle';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <div className="grid bg-card min-h-svh lg:grid-cols-2">
        {/* Image */}
        <div className="relative hidden bg-muted lg:block">
          <Image
            src="/images/placeholder.jpg"
            alt="Image"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-top dark:brightness-[0.7] dark:grayscale"
            priority
          />
        </div>

        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-between gap-2 ltr:md:flex-row ltr:md:justify-between rtl:md:flex-row-reverse rtl:md:justify-between">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <Image src="/images/logo.svg" alt="Roodx Logo" width={120} height={38} priority className="h-auto w-auto dark:invert" />
            </Link>
            <LanguageToggle />
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm">{children}</div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
