'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Menu } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { useHeaderActions } from '@/hooks/useHeaderActions';

import Button from '@/components/common/Button/Button';
import CompanyLogo from '@/components/header/CompanyLogo/CompanyLogo';
import LoginButton from '@/components/header/AuthActionButton/LoginButton';
import LogoutButton from '@/components/header/AuthActionButton/LogoutButton';
import MenuNav from '@/components/header/MenuNav/MenuNav';
import UserBadge from '@/components/header/UserBadge/UserBadge';

import css from './Header.module.css';

//===============================================================

const MobileOffcanvas = dynamic(
  () => import('@/components/header/MobileOffcanvas/MobileOffcanvas'),
  {
    ssr: false,
  }
);

//===============================================================

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, isAuthenticated, isAuthReady } = useAuth();

  const {
    openLoginModal,
    openRegisterModal,
    handleProtectedNavClick,
    handleLogout,
  } = useHeaderActions();

  const openMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);

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
          <MenuNav
            isAuthenticated={isAuthenticated}
            onProtectedNavClick={handleProtectedNavClick}
            variant="offcanvas"
          />
        </div>

        <div className={css.desktopActions}>
          {!isAuthReady ? (
            <div className={css.actionsPlaceholder} aria-hidden="true" />
          ) : isAuthenticated ? (
            <>
              <UserBadge
                name={user?.name ?? 'User'}
                avatarUrl={user?.avatarUrl}
              />
              <LogoutButton onClick={handleLogout} />
            </>
          ) : (
            <>
              <LoginButton onClick={openLoginModal} />

              <Button
                variant="registration"
                className={css.registrationBtn}
                onClick={openRegisterModal}
              >
                Registration
              </Button>
            </>
          )}
        </div>

        {isMobileMenuOpen ? (
          <MobileOffcanvas isOpen={isMobileMenuOpen} onClose={closeMenu} />
        ) : null}
      </div>
    </header>
  );
}

export default Header;
