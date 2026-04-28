'use client';

import { useId } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

import { useBackdropClose } from '@/hooks/useBackdropClose';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

import CloseButton from '@/components/common/CloseButton/CloseButton';

import css from './ModalBase.module.css';

//===============================================================

type Props = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  maxWidth?: number;
};

//===============================================================

function ModalBase({ title, children, onClose, maxWidth = 600 }: Props) {
  const titleId = useId();

  const handleBackdropClick = useBackdropClose(onClose);

  useEscapeKey({
    isEnabled: true,
    onEscape: onClose,
  });

  useLockBodyScroll(true);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={css.modal} style={{ maxWidth }}>
        <CloseButton
          className={css.closeBtn}
          label="Close modal"
          onClick={onClose}
        />

        <h2 id={titleId} className={css.title}>
          {title}
        </h2>

        {children}
      </div>
    </div>,
    document.body
  );
}

export default ModalBase;
