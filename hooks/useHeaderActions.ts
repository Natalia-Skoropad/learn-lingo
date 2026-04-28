'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';

//===============================================================

type Options = {
  onBeforeModalOpen?: () => void;
  onAfterLogout?: () => void;
};

//===============================================================

export function useHeaderActions({
  onBeforeModalOpen,
  onAfterLogout,
}: Options = {}) {
  const router = useRouter();
  const pathname = usePathname();

  const { openModal } = useModal();
  const { logout } = useAuth();

  const openLoginModal = useCallback(() => {
    onBeforeModalOpen?.();
    openModal('login');
  }, [onBeforeModalOpen, openModal]);

  const openRegisterModal = useCallback(() => {
    onBeforeModalOpen?.();
    openModal('register');
  }, [onBeforeModalOpen, openModal]);

  const handleProtectedNavClick = useCallback(() => {
    onBeforeModalOpen?.();
    toast.error('You need to sign in to open Favorites.');
    openModal('login');
  }, [onBeforeModalOpen, openModal]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();

      onAfterLogout?.();

      toast.success('Logged out successfully!');

      if (pathname.startsWith('/favorites')) {
        router.replace('/');
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Logout failed. Please try again.');
    }
  }, [logout, onAfterLogout, pathname, router]);

  return {
    openLoginModal,
    openRegisterModal,
    handleProtectedNavClick,
    handleLogout,
  };
}
