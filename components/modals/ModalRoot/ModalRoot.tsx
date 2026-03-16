'use client';

import dynamic from 'next/dynamic';

import { useModal } from '@/hooks/useModal';

//===============================================================

const LoginModal = dynamic(
  () => import('@/components/modals/LoginModal/LoginModal')
);

const RegisterModal = dynamic(
  () => import('@/components/modals/RegisterModal/RegisterModal')
);

const ForgotPasswordModal = dynamic(
  () => import('@/components/modals/ForgotPasswordModal/ForgotPasswordModal')
);

const BookLessonModal = dynamic(
  () => import('@/components/modals/BookLessonModal/BookLessonModal')
);

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
