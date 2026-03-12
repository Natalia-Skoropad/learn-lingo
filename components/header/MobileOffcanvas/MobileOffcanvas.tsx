'use client';

import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Button from '@/components/common/Button/Button';
import CloseButton from '@/components/common/CloseButton/CloseButton';
import LoginButton from '@/components/header/AuthActionButton/LoginButton';
import CompanyLogo from '@/components/header/CompanyLogo/CompanyLogo';
import MenuNav from '@/components/header/MenuNav/MenuNav';
import { useModal } from '@/hooks/useModal';

import css from './MobileOffcanvas.module.css';

//===============================================================

interface MobileOffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
}

//===============================================================

function MobileOffcanvas({ isOpen, onClose }: MobileOffcanvasProps) {
  const pathname = usePathname();
  const { openModal } = useModal();

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const handleOpenLoginModal = () => {
    onClose();
    openModal('login');
  };

  const handleOpenRegisterModal = () => {
    onClose();
    openModal('register');
  };

  useEffect(() => {
    if (!isOpen) return;
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

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
          <MenuNav />

          <div className={css.actions}>
            <LoginButton
              className={css.loginButton}
              onClick={handleOpenLoginModal}
            />

            <Button
              variant="registration"
              className={css.registrationButton}
              onClick={handleOpenRegisterModal}
            >
              Registration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileOffcanvas;
