'use client';

import type { Teacher } from '@/types/teacher';

import BookLessonForm from '@/components/forms/BookLessonForm/BookLessonForm';
import ModalBase from '@/components/modals/ModalBase/ModalBase';
import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useAuth';

//===============================================================

type Props = {
  teacher: Teacher;
};

//===============================================================

function BookLessonModal({ teacher }: Props) {
  const { closeModal } = useModal();
  const { user, isAuthenticated } = useAuth();

  return (
    <ModalBase title="Book trial lesson" onClose={closeModal}>
      <BookLessonForm
        key={`${teacher.id}-${user?.uid ?? 'guest'}`}
        teacher={teacher}
        onSuccess={closeModal}
        prefilledName={isAuthenticated ? user?.name ?? '' : ''}
        prefilledEmail={isAuthenticated ? user?.email ?? '' : ''}
      />
    </ModalBase>
  );
}

export default BookLessonModal;
