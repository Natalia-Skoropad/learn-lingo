'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';
import { useBackdropClose } from '@/hooks/useBackdropClose';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useHeaderActions } from '@/hooks/useHeaderActions';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

import Button from '@/components/common/Button/Button';
import CloseButton from '@/components/common/CloseButton/CloseButton';
import LoginButton from '@/components/header/AuthActionButton/LoginButton';
import CompanyLogo from '@/components/header/CompanyLogo/CompanyLogo';
import MenuNav from '@/components/header/MenuNav/MenuNav';
import LogoutButton from '@/components/header/AuthActionButton/LogoutButton';
import UserBadge from '@/components/header/UserBadge/UserBadge';

import css from './MobileOffcanvas.module.css';

//===============================================================

interface MobileOffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
}

//===============================================================

function MobileOffcanvas({ isOpen, onClose }: MobileOffcanvasProps) {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);

  const { user, isAuthenticated, isAuthReady } = useAuth();

  const {
    openLoginModal,
    openRegisterModal,
    handleProtectedNavClick,
    handleLogout,
  } = useHeaderActions({
    onBeforeModalOpen: onClose,
    onAfterLogout: onClose,
  });

  const handleBackdropClick = useBackdropClose(onClose);

  useEscapeKey({
    isEnabled: isOpen,
    onEscape: onClose,
  });

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    if (previousPathnameRef.current !== pathname) {
      onClose();
    }

    previousPathnameRef.current = pathname;
  }, [isOpen, pathname, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.panel} role="document">
        <div className={css.header}>
          <CompanyLogo />
          <CloseButton onClick={onClose} />
        </div>

        <div className={css.content}>
          <MenuNav
            isAuthenticated={isAuthenticated}
            onProtectedNavClick={handleProtectedNavClick}
          />

          <div className={css.actions}>
            {!isAuthReady ? null : isAuthenticated ? (
              <>
                <UserBadge
                  name={user?.name ?? 'User'}
                  className={css.userBadge}
                />

                <LogoutButton
                  className={css.loginButton}
                  onClick={handleLogout}
                />
              </>
            ) : (
              <>
                <LoginButton
                  className={css.loginButton}
                  onClick={openLoginModal}
                />

                <Button
                  variant="registration"
                  className={css.registrationButton}
                  onClick={openRegisterModal}
                >
                  Registration
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileOffcanvas;
