'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { MouseEvent, ReactNode } from 'react';

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
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={css.modal} style={{ maxWidth }}>
        <CloseButton
          className={css.closeBtn}
          label="Close modal"
          onClick={onClose}
        />

        <h2 id="modal-title" className={css.title}>
          {title}
        </h2>

        {children}
      </div>
    </div>,
    document.body
  );
}

export default ModalBase;
