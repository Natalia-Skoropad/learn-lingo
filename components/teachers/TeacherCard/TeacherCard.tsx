'use client';

import { useState } from 'react';

import type { Teacher } from '@/types/teacher';

import FavoriteButton from '@/components/teachers/FavoriteButton/FavoriteButton';
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

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <article className={css.card}>
      <FavoriteButton
        isActive={false}
        onToggle={() => {}}
        className={css.favoriteBtn}
        size="lg"
      />

      <TeacherAvatar avatarUrl={teacher.avatar_url} fullName={fullName} />

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

            <button
              type="button"
              className={css.readMoreBtn}
              onClick={handleToggleExpand}
            >
              Show less
            </button>
          </>
        ) : (
          <button
            type="button"
            className={css.readMoreBtn}
            onClick={handleToggleExpand}
          >
            Read more
          </button>
        )}

        <TeacherLevels levels={teacher.levels} />

        {isExpanded ? (
          <button type="button" className={css.bookBtn}>
            Book trial lesson
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default TeacherCard;
