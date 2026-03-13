'use client';

import BookLessonModal from '@/components/modals/BookLessonModal/BookLessonModal';
import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal/ForgotPasswordModal';
import LoginModal from '@/components/modals/LoginModal/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal/RegisterModal';
import { useModal } from '@/hooks/useModal';

//===============================================================

function ModalRoot() {
  const { modalType, payload } = useModal();

  if (modalType === 'login') {
    return <LoginModal />;
  }

  if (modalType === 'register') {
    return <RegisterModal />;
  }

  if (modalType === 'forgotPassword') {
    return <ForgotPasswordModal />;
  }

  if (modalType === 'bookLesson' && payload?.teacher) {
    return <BookLessonModal teacher={payload.teacher} />;
  }

  return null;
}

export default ModalRoot;
