'use client';

import ModalBase from '@/components/modals/ModalBase/ModalBase';
import LoginForm from '@/components/forms/LoginForm/LoginForm';
import { useModal } from '@/hooks/useModal';

//===============================================================

function LoginModal() {
  const { closeModal } = useModal();

  return (
    <ModalBase title="Log In" onClose={closeModal}>
      <LoginForm onSuccess={closeModal} />
    </ModalBase>
  );
}

export default LoginModal;
