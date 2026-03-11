'use client';

import ModalBase from '@/components/modals/ModalBase/ModalBase';
import RegisterForm from '@/components/forms/RegisterForm/RegisterForm';
import { useModal } from '@/hooks/useModal';

//===============================================================

function RegisterModal() {
  const { closeModal } = useModal();

  return (
    <ModalBase title="Registration" onClose={closeModal}>
      <RegisterForm onSuccess={closeModal} />
    </ModalBase>
  );
}

export default RegisterModal;
