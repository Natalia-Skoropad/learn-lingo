'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

import css from './MenuNav.module.css';

//===============================================================

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

//===============================================================

function MenuNav() {
  const pathname = usePathname();
  const { isAuthenticated, isAuthReady } = useAuth();

  const favoritesEnabled = isAuthReady && isAuthenticated;

  const navItems = [
    { href: '/', label: 'Home', disabled: false },
    { href: '/teachers', label: 'Teachers', disabled: false },
    {
      href: '/favorites',
      label: 'Favorites',
      disabled: !favoritesEnabled,
    },
  ];

  return (
    <nav className={css.menuNav} aria-label="Primary navigation">
      <ul className={css.menuList}>
        {navItems.map(({ href, label, disabled }) => (
          <li key={href} className={css.menuItem}>
            {disabled ? (
              <span
                className={clsx(css.link, css.linkDisabled)}
                aria-disabled="true"
              >
                {label}
              </span>
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
        ))}
      </ul>
    </nav>
  );
}

export default MenuNav;
