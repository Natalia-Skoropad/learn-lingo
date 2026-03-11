'use client';

import { Star } from 'lucide-react';

import FavoriteButton from '@/components/teachers/FavoriteButton/FavoriteButton';
import SvgIcon from '@/components/common/SvgIcon/SvgIcon';
import type { Teacher } from '@/types/teacher';

import css from './TeacherCard.module.css';

//===============================================================

type Props = {
  teacher: Teacher;
};

//===============================================================

function TeacherCard({ teacher }: Props) {
  const fullName = `${teacher.name} ${teacher.surname}`;
  const speaks = teacher.languages.join(', ');
  const conditionsText = teacher.conditions.join(' ');

  return (
    <article className={css.card}>
      <div className={css.avatarWrap}>
        <div className={css.avatarBorder}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={css.avatar}
            src={teacher.avatar_url}
            alt={fullName}
            width={96}
            height={96}
          />
        </div>

        <span className={css.statusDot} />
      </div>

      <div className={css.content}>
        <div className={css.topRow}>
          <div className={css.titleWrap}>
            <p className={css.label}>Languages</p>
            <h2 className={css.name}>{fullName}</h2>
          </div>

          <div className={css.metaWrap}>
            <ul className={css.metaList}>
              <li className={css.metaItem}>
                <SvgIcon
                  name="icon-book"
                  className={css.metaIconBook}
                  title="Lessons online"
                  size={16}
                />
                <span>Lessons online</span>
              </li>

              <li className={css.metaItem}>
                <span className={css.metaLabel}>Lessons done:</span>
                <span>{teacher.lessons_done}</span>
              </li>

              <li className={css.metaItem}>
                <Star className={css.metaIconStar} size={16} />
                <span className={css.metaLabel}>Rating:</span>
                <span>{teacher.rating}</span>
              </li>

              <li className={css.metaItem}>
                <span className={css.metaLabel}>Price / 1 hour:</span>
                <span className={css.price}>{teacher.price_per_hour}$</span>
              </li>
            </ul>

            <FavoriteButton
              isActive={false}
              onToggle={() => {}}
              className={css.favoriteBtn}
              size="lg"
            />
          </div>
        </div>

        <div className={css.infoBlock}>
          <p className={css.text}>
            <span className={css.infoLabel}>Speaks:</span>{' '}
            <span className={css.underlined}>{speaks}</span>
          </p>

          <p className={css.text}>
            <span className={css.infoLabel}>Lesson Info:</span>{' '}
            {teacher.lesson_info}
          </p>

          <p className={css.text}>
            <span className={css.infoLabel}>Conditions:</span> {conditionsText}
          </p>
        </div>

        <button type="button" className={css.readMoreBtn}>
          Read more
        </button>

        <ul className={css.levelsList}>
          {teacher.levels.map((level, index) => (
            <li
              key={level}
              className={`${css.levelItem} ${
                index === 0 ? css.levelItemAccent : ''
              }`}
            >
              #{level}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default TeacherCard;
