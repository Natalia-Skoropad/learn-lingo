'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';

//===============================================================

type Props = {
  children: React.ReactNode;
};

//===============================================================

function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isAuthReady } = useAuth();

  useEffect(() => {
    if (!isAuthReady) return;

    if (!isAuthenticated) {
      toast.error('Please log in to access Favorites.');
      router.replace(`/?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isAuthReady, pathname, router]);

  if (!isAuthReady) return null;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}

export default AuthGuard;
