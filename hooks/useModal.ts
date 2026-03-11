import { useModalStore } from '@/lib/store/modalStore';

//===============================================================

export function useModal() {
  const modalType = useModalStore((state) => state.modalType);
  const payload = useModalStore((state) => state.payload);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  return {
    modalType,
    payload,
    openModal,
    closeModal,
    isOpen: modalType !== null,
    isLoginOpen: modalType === 'login',
    isRegisterOpen: modalType === 'register',
    isBookLessonOpen: modalType === 'bookLesson',
  };
}
