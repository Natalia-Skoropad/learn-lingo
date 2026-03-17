'use client';

import { useState } from 'react';

import type { Teacher } from '@/types/teacher';

import TextActionButton from '@/components/common/TextActionButton/TextActionButton';
import FavoriteTeacherButton from '@/components/teachers/FavoriteTeacherButton/FavoriteTeacherButton';
import BookLessonTrigger from '@/components/teachers/BookLessonTrigger/BookLessonTrigger';
import TeacherAvatar from '@/components/teachers/TeacherAvatar/TeacherAvatar';
import TeacherHeader from '@/components/teachers/TeacherHeader/TeacherHeader';
import TeacherInfo from '@/components/teachers/TeacherInfo/TeacherInfo';
import TeacherLevels from '@/components/teachers/TeacherLevels/TeacherLevels';
import TeacherMeta from '@/components/teachers/TeacherMeta/TeacherMeta';
import TeacherReviews from '@/components/teachers/TeacherReviews/TeacherReviews';

import css from './TeacherCard.module.css';

//===============================================================

type Props = {
  teacher: Teacher;
};

//===============================================================

function TeacherCard({ teacher }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullName = `${teacher.name} ${teacher.surname}`;

  const handleToggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <article className={css.card}>
      <FavoriteTeacherButton teacher={teacher} className={css.favoriteBtn} />

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

        <div className={css.details}>
          <TextActionButton
            className={css.readMoreBtn}
            onClick={handleToggleDetails}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Hide details' : 'View more info and reviews'}
          </TextActionButton>

          {isExpanded && (
            <div className={css.expandedContent}>
              <p className={css.experience}>{teacher.experience}</p>
              <TeacherReviews reviews={teacher.reviews} />
            </div>
          )}
        </div>

        <div className={css.bottomRow}>
          <TeacherLevels levels={teacher.levels} />

          <BookLessonTrigger teacher={teacher} className={css.bookBtn} />
        </div>
      </div>
    </article>
  );
}

export default TeacherCard;
