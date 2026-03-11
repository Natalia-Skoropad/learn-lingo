'use client';

import { DollarSign, BookCheck, BookOpen, Star } from 'lucide-react';

import css from './TeacherMeta.module.css';

//===============================================================

type Props = {
  lessonsDone: number;
  rating: number;
  pricePerHour: number;
};

//===============================================================

function TeacherMeta({ lessonsDone, rating, pricePerHour }: Props) {
  return (
    <div className={css.metaWrap}>
      <ul className={css.metaList}>
        <li className={css.metaItem}>
          <BookOpen className={css.metaIconDefault} size={16} />
          <span>Lessons online</span>
        </li>

        <li className={css.metaItem}>
          <BookCheck className={css.metaIconDefault} size={16} />
          <span className={css.metaLabel}>Lessons done:</span>
          <span>{lessonsDone}</span>
        </li>

        <li className={css.metaItem}>
          <Star className={css.metaIconStar} size={16} />
          <span className={css.metaLabel}>Rating:</span>
          <span>{rating}</span>
        </li>

        <li className={css.metaItem}>
          <DollarSign className={css.metaIconPrice} size={16} />
          <span className={css.metaLabel}>Price / 1 hour:</span>
          <span className={css.price}>{pricePerHour}$</span>
        </li>
      </ul>
    </div>
  );
}

export default TeacherMeta;
