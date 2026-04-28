'use client';

import { useId } from 'react';

import { useBackdropClose } from '@/hooks/useBackdropClose';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

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
  const titleId = useId();

  const handleBackdropClick = useBackdropClose(onClose);

  useEscapeKey({
    isEnabled: isOpen,
    onEscape: onClose,
  });

  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <div
      className={css.offcanvasBackdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={css.offcanvasPanel} role="document">
        <header className={css.offcanvasHeader}>
          <h2 id={titleId} className={css.offcanvasTitle}>
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
