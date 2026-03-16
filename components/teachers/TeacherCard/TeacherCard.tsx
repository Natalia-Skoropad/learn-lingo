import type { Teacher } from '@/types/teacher';

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
  const fullName = `${teacher.name} ${teacher.surname}`;

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

        <details className={css.details}>
          <summary
            className={css.readMoreBtn}
            data-open-text="Hide details"
            data-closed-text="View more info and reviews"
          />

          <div className={css.expandedContent}>
            <p className={css.experience}>{teacher.experience}</p>
            <TeacherReviews reviews={teacher.reviews} />
          </div>
        </details>

        <div className={css.bottomRow}>
          <TeacherLevels levels={teacher.levels} />

          <BookLessonTrigger teacher={teacher} className={css.bookBtn} />
        </div>
      </div>
    </article>
  );
}

export default TeacherCard;
