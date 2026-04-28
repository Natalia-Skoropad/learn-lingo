'use client';

import { useCallback } from 'react';

//===============================================================

type BackdropClickEvent =
  | React.MouseEvent<HTMLDivElement>
  | React.MouseEvent<HTMLButtonElement>;

//===============================================================

export function useBackdropClose(onClose: () => void) {
  return useCallback(
    (event: BackdropClickEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );
}
