'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import type { Teacher } from '@/types/teacher';
import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';

import Button from '@/components/common/Button/Button';
import TextActionButton from '@/components/common/TextActionButton/TextActionButton';
import FavoriteButton from '@/components/teachers/FavoriteButton/FavoriteButton';
import TeacherAvatar from '@/components/teachers/TeacherAvatar/TeacherAvatar';
import TeacherHeader from '@/components/teachers/TeacherHeader/TeacherHeader';
import TeacherInfo from '@/components/teachers/TeacherInfo/TeacherInfo';
import TeacherLevels from '@/components/teachers/TeacherLevels/TeacherLevels';
import TeacherMeta from '@/components/teachers/TeacherMeta/TeacherMeta';
import TeacherReviews from '@/components/teachers/TeacherReviews/TeacherReviews';
import BookLessonModal from '@/components/modals/BookLessonModal/BookLessonModal';

import css from './TeacherCard.module.css';

//===============================================================

type Props = {
  teacher: Teacher;
};

//===============================================================

function TeacherCard({ teacher }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { openModal, isBookLessonOpen, payload } = useModal();
  const { isAuthenticated, isAuthReady } = useAuth();
  const { isFavorite, isUpdating, toggleFavorite } = useFavorites();

  const fullName = `${teacher.name} ${teacher.surname}`;
  const favoriteActive = isFavorite(teacher.id);
  const favoriteUpdating = isUpdating(teacher.id);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleOpenBookModal = () => {
    openModal('bookLesson', { teacher });
  };

  const handleToggleFavorite = async () => {
    if (!isAuthReady) return;

    if (!isAuthenticated) {
      toast.error('This feature is available only for authorized users.');
      openModal('login');
      return;
    }

    try {
      const result = await toggleFavorite(teacher.id);

      if (result === 'added') {
        toast.success('Teacher added to favorites.');
      } else {
        toast.success('Teacher removed from favorites.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update favorites. Please try again.');
    }
  };

  const isCurrentTeacherModalOpen =
    isBookLessonOpen && payload?.teacher?.id === teacher.id;

  return (
    <>
      <article className={css.card}>
        <FavoriteButton
          isActive={favoriteActive}
          onToggle={handleToggleFavorite}
          disabled={favoriteUpdating}
          className={css.favoriteBtn}
          size="lg"
        />

        <TeacherAvatar
          avatarUrl={teacher.avatar_url}
          fullName={fullName}
          isOnline={teacher.isOnline}
        />

        <div className={css.content}>
          <div className={css.topRow}>
            <TeacherHeader fullName={fullName} />
            <TeacherMeta
              lessonsDone={teacher.lessons_done}
              rating={teacher.rating}
              pricePerHour={teacher.price_per_hour}
            />
          </div>

          <TeacherInfo
            languages={teacher.languages}
            lessonInfo={teacher.lesson_info}
            conditions={teacher.conditions}
          />

          {isExpanded ? (
            <>
              <p className={css.experience}>{teacher.experience}</p>

              <TeacherReviews reviews={teacher.reviews} />

              <TextActionButton
                className={css.readMoreBtn}
                onClick={handleToggleExpand}
              >
                Hide additional info
              </TextActionButton>
            </>
          ) : (
            <TextActionButton
              className={css.readMoreBtn}
              onClick={handleToggleExpand}
            >
              View more info and reviews
            </TextActionButton>
          )}

          <div className={css.bottomRow}>
            <TeacherLevels levels={teacher.levels} />

            <Button
              type="button"
              className={css.bookBtn}
              onClick={handleOpenBookModal}
            >
              Book trial lesson
            </Button>
          </div>
        </div>
      </article>

      {isCurrentTeacherModalOpen ? <BookLessonModal teacher={teacher} /> : null}
    </>
  );
}

export default TeacherCard;
