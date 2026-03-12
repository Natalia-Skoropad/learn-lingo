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
  const { isAuthenticated } = useAuth();

  const navItems = isAuthenticated
    ? [
        { href: '/', label: 'Home' },
        { href: '/teachers', label: 'Teachers' },
        { href: '/favorites', label: 'Favorites' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/teachers', label: 'Teachers' },
      ];

  return (
    <nav className={css.menuNav} aria-label="Primary navigation">
      <ul className={css.menuList}>
        {navItems.map(({ href, label }) => (
          <li key={href} className={css.menuItem}>
            <Link
              href={href}
              className={clsx(css.link, {
                [css.active]: isActive(pathname, href),
              })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MenuNav;
