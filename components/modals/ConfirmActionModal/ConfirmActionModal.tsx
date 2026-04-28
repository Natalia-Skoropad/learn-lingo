'use client';

import Button from '@/components/common/Button/Button';
import ModalBase from '@/components/modals/ModalBase/ModalBase';

import css from './ConfirmActionModal.module.css';

//===============================================================

type Props = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

//===============================================================

function ConfirmActionModal({
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isSubmitting = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <ModalBase title={title} onClose={onCancel} maxWidth={448}>
      <div className={css.content}>
        <p className={css.message}>{message}</p>

        <div className={css.actions}>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className={css.cancelBtn}
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            variant="common"
            onClick={onConfirm}
            disabled={isSubmitting}
            className={css.confirmBtn}
          >
            {isSubmitting ? 'Deleting...' : confirmLabel}
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}

export default ConfirmActionModal;
