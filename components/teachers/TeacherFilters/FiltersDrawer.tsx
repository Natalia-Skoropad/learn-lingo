'use client';

import { useCallback, useEffect } from 'react';
import CloseButton from '@/components/common/CloseButton/CloseButton';

import css from './TeacherFilters.module.css';

//===========================================================================

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

//===========================================================================

function FiltersDrawer({ isOpen, onClose, children }: Props) {
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={css.offcanvasBackdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="filters-drawer-title"
    >
      <div className={css.offcanvasPanel} role="document">
        <header className={css.offcanvasHeader}>
          <h2 id="filters-drawer-title" className={css.offcanvasTitle}>
            Filters
          </h2>

          <CloseButton onClick={onClose} />
        </header>

        <div className={css.offcanvasContent}>{children}</div>
      </div>
    </div>
  );
}

export default FiltersDrawer;
