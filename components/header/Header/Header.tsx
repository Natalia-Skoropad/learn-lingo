'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

import Button from '@/components/common/Button/Button';
import CompanyLogo from '@/components/header/CompanyLogo/CompanyLogo';
import LoginButton from '@/components/header/AuthActionButton/LoginButton';
import MenuNav from '@/components/header/MenuNav/MenuNav';
import MobileOffcanvas from '@/components/header/MobileOffcanvas/MobileOffcanvas';

import css from './Header.module.css';

//===============================================================

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);

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
          <LoginButton />
          <Button variant="registration" className={css.registrationBtn}>
            Registration
          </Button>
        </div>

        <MobileOffcanvas isOpen={isMobileMenuOpen} onClose={closeMenu} />
      </div>
    </header>
  );
}

export default Header;
