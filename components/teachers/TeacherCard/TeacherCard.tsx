'use client';

import type { Teacher } from '@/types/teacher';

import FavoriteButton from '@/components/teachers/FavoriteButton/FavoriteButton';
import TeacherAvatar from '@/components/teachers/TeacherAvatar/TeacherAvatar';
import TeacherHeader from '@/components/teachers/TeacherHeader/TeacherHeader';
import TeacherInfo from '@/components/teachers/TeacherInfo/TeacherInfo';
import TeacherLevels from '@/components/teachers/TeacherLevels/TeacherLevels';
import TeacherMeta from '@/components/teachers/TeacherMeta/TeacherMeta';

import css from './TeacherCard.module.css';

//===============================================================

type Props = {
  teacher: Teacher;
};

//===============================================================

function TeacherCard({ teacher }: Props) {
  const fullName = `${teacher.name} ${teacher.surname}`;

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

        <button type="button" className={css.readMoreBtn}>
          Read more
        </button>

        <TeacherLevels levels={teacher.levels} />
      </div>
    </article>
  );
}

export default TeacherCard;
