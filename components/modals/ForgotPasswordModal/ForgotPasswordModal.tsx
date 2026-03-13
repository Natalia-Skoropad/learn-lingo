'use client';

import ModalBase from '@/components/modals/ModalBase/ModalBase';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm/ForgotPasswordForm';
import { useModal } from '@/hooks/useModal';

//===============================================================

function ForgotPasswordModal() {
  const { closeModal } = useModal();

  return (
    <ModalBase title="Forgot Password" onClose={closeModal}>
      <ForgotPasswordForm onSuccess={closeModal} />
    </ModalBase>
  );
}

export default ForgotPasswordModal;
