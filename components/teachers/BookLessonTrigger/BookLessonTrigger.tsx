'use client';

import type { Teacher } from '@/types/teacher';
import { useModal } from '@/hooks/useModal';

import Button from '@/components/common/Button/Button';

//===============================================================

type Props = {
  teacher: Teacher;
  className?: string;
};

//===============================================================

function BookLessonTrigger({ teacher, className }: Props) {
  const { openModal } = useModal();

  const handleOpenBookModal = () => {
    openModal('bookLesson', { teacher });
  };

  return (
    <Button type="button" className={className} onClick={handleOpenBookModal}>
      Book trial lesson
    </Button>
  );
}

export default BookLessonTrigger;
