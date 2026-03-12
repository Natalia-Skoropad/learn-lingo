'use client';

import clsx from 'clsx';
import { Heart } from 'lucide-react';

import css from './FavoriteButton.module.css';

//===============================================================

type Props = {
  isActive: boolean;
  onToggle: () => void;
  className?: string;
  size?: 'md' | 'lg';
  disabled?: boolean;
};

//===============================================================

function FavoriteButton({
  isActive,
  onToggle,
  className,
  size = 'lg',
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      className={clsx(css.btn, css[size], isActive && css.active, className)}
      aria-pressed={isActive}
      aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
      aria-busy={disabled}
      disabled={disabled}
      onClick={onToggle}
    >
      <Heart className={css.icon} />
    </button>
  );
}

export default FavoriteButton;
