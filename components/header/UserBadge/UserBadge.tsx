'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import css from './UserBadge.module.css';

//===============================================================

type Props = {
  name: string;
  avatarUrl?: string;
  className?: string;
};

//===============================================================

function UserBadge({ name, avatarUrl, className }: Props) {
  const trimmedName = name.trim() || 'User';
  const initial = trimmedName.charAt(0).toUpperCase();

  return (
    <Link
      href="/profile"
      className={clsx(css.userBox, className)}
      aria-label="Open profile page"
    >
      <span className={css.avatar} aria-hidden="true">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt=""
            fill
            sizes="32px"
            className={css.avatarImage}
          />
        ) : (
          initial
        )}
      </span>

      <span className={css.userName}>{trimmedName}</span>
    </Link>
  );
}

export default UserBadge;
