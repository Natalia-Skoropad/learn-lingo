'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';

import Button from '@/components/common/Button/Button';
import CompanyLogo from '@/components/header/CompanyLogo/CompanyLogo';
import LoginButton from '@/components/header/AuthActionButton/LoginButton';
import LogoutButton from '@/components/header/AuthActionButton/LogoutButton';
import MenuNav from '@/components/header/MenuNav/MenuNav';
import MobileOffcanvas from '@/components/header/MobileOffcanvas/MobileOffcanvas';
import UserBadge from '@/components/header/UserBadge/UserBadge';

import css from './Header.module.css';

//===============================================================

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { openModal } = useModal();
  const { user, isAuthenticated, isAuthReady, logout } = useAuth();

  const openMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleOpenLoginModal = () => {
    openModal('login');
  };

  const handleOpenRegisterModal = () => {
    openModal('register');
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Logout failed. Please try again.');
    }
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <CompanyLogo />

        <button
          type="button"
          onClick={openMenu}
          aria-label="Open navigation menu"
          className={css.menuToggle}
        >
          <Menu className={css.menuIcon} />
        </button>

        <div className={css.desktopNav}>
          <MenuNav />
        </div>

        <div className={css.desktopActions}>
          {!isAuthReady ? (
            <div className={css.actionsPlaceholder} aria-hidden="true" />
          ) : isAuthenticated ? (
            <>
              <UserBadge name={user?.name ?? 'User'} />
              <LogoutButton onClick={handleLogout} />
            </>
          ) : (
            <>
              <LoginButton onClick={handleOpenLoginModal} />

              <Button
                variant="registration"
                className={css.registrationBtn}
                onClick={handleOpenRegisterModal}
              >
                Registration
              </Button>
            </>
          )}
        </div>

        <MobileOffcanvas isOpen={isMobileMenuOpen} onClose={closeMenu} />
      </div>
    </header>
  );
}

export default Header;
