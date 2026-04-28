'use client';

import { useEffect } from 'react';

//===============================================================

type Options = {
  isEnabled: boolean;
  onEscape: () => void;
};

//===============================================================

export function useEscapeKey({ isEnabled, onEscape }: Options) {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled, onEscape]);
}
