'use client';

import Link from 'next/link';

import css from './UserBadge.module.css';

//===============================================================

type Props = {
  name: string;
  className?: string;
};

//===============================================================

function UserBadge({ name, className }: Props) {
  const trimmedName = name.trim() || 'User';
  const initial = trimmedName.charAt(0).toUpperCase();

  return (
    <Link
      href="/profile"
      className={`${css.userBox} ${className ?? ''}`}
      aria-label="Open profile page"
    >
      <span className={css.avatar} aria-hidden="true">
        {initial}
      </span>

      <span className={css.userName}>{trimmedName}</span>
    </Link>
  );
}

export default UserBadge;
