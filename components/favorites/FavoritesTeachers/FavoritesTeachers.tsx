'use client';

import EmptyState from '@/components/common/EmptyState/EmptyState';
import InlineLoader from '@/components/common/InlineLoader/InlineLoader';
import TeacherCard from '@/components/teachers/TeacherCard/TeacherCard';

import { useFavorites } from '@/hooks/useFavorites';

import css from './FavoritesTeachers.module.css';

//===============================================================

function FavoritesTeachers() {
  const { favoriteTeachers, isFavoritesLoading, isFavoritesLoaded } =
    useFavorites();

  if (!isFavoritesLoaded || isFavoritesLoading) {
    return <InlineLoader text="Loading favorites..." />;
  }

  if (!favoriteTeachers.length) {
    return (
      <EmptyState
        title="No favorite teachers yet"
        text="Add teachers to your favorites from the Teachers page, and they will appear here."
      />
    );
  }

  const resultsLabel = `${favoriteTeachers.length} favorite teacher${
    favoriteTeachers.length === 1 ? '' : 's'
  }`;

  return (
    <>
      <p className={css.resultsText}>{resultsLabel}</p>

      <ul className={css.list}>
        {favoriteTeachers.map((teacher) => (
          <li key={teacher.id} className={css.item}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default FavoritesTeachers;
