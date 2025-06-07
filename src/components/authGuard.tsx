'use client';
import { useEffect, useState } from 'react';
import { useLoadUserQuery } from '@/store/api';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: user, isSuccess, isLoading, isError } = useLoadUserQuery({});
  const router = useRouter();
  const pathname = usePathname() as string;
  const [isClient, setIsClient] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || isLoading) return;

    // If not authenticated and not on auth pages, redirect to login
    if ((!isSuccess || isError) && !['/login', '/signup', '/forgot-password'].includes(pathname)) {
      if (!isRedirecting) {
        setIsRedirecting(true);
        router.replace('/login');
      }
      return;
    }

    // If authenticated and on auth pages, redirect to home
    if (isSuccess && ['/login', '/signup', '/forgot-password'].includes(pathname)) {
      if (!isRedirecting) {
        setIsRedirecting(true);
        router.replace('/home');
      }
      return;
    }

    // Admin specific redirection
    if (isSuccess && user?.role === 'admin' && pathname === '/dashboard') {
      if (!isRedirecting) {
        setIsRedirecting(true);
        router.replace('/home');
      }
      return;
    }
  }, [isClient, isLoading, isSuccess, isError, user, pathname, router, isRedirecting]);

  if (!isClient || isLoading || isRedirecting) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
