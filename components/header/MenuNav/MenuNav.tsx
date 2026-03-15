'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';

import css from './MenuNav.module.css';

//===============================================================

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

//===============================================================

function MenuNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();

  const handleProtectedNavClick = () => {
    toast.error('You need to sign in to open Favorites.');
    openModal('login');
  };

  const navItems = [
    { href: '/', label: 'Home', protected: false },
    { href: '/teachers', label: 'Teachers', protected: false },
    { href: '/favorites', label: 'Favorites', protected: true },
  ];

  return (
    <nav className={css.menuNav} aria-label="Primary navigation">
      <ul className={css.menuList}>
        {navItems.map(({ href, label, protected: isProtected }) => {
          const isLocked = isProtected && !isAuthenticated;

          return (
            <li key={href} className={css.menuItem}>
              {isLocked ? (
                <button
                  type="button"
                  className={clsx(css.link, css.linkButton, css.linkLocked)}
                  onClick={handleProtectedNavClick}
                  aria-label={`${label} page requires authorization`}
                >
                  {label}
                </button>
              ) : (
                <Link
                  href={href}
                  className={clsx(css.link, {
                    [css.active]: isActive(pathname, href),
                  })}
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MenuNav;
