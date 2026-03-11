'use client';

import type { Teacher } from '@/types/teacher';

import BookLessonForm from '@/components/forms/BookLessonForm/BookLessonForm';
import ModalBase from '@/components/modals/ModalBase/ModalBase';
import { useModal } from '@/hooks/useModal';

//===============================================================

type Props = {
  teacher: Teacher;
};

//===============================================================

function BookLessonModal({ teacher }: Props) {
  const { closeModal } = useModal();

  return (
    <ModalBase title="Book trial lesson" onClose={closeModal}>
      <BookLessonForm teacher={teacher} onSuccess={closeModal} />
    </ModalBase>
  );
}

export default BookLessonModal;
