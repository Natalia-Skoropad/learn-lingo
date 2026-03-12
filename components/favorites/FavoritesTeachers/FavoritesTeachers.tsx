'use client';

import { useEffect, useState } from 'react';

import type { Teacher } from '@/types/teacher';

import InlineLoader from '@/components/common/InlineLoader/InlineLoader';
import TeacherCard from '@/components/teachers/TeacherCard/TeacherCard';

import { useFavorites } from '@/hooks/useFavorites';
import { teachersService } from '@/lib/services/teachers.service';

import css from './FavoritesTeachers.module.css';

//===============================================================

function FavoritesTeachers() {
  const { favoriteIds, isFavoritesLoading } = useFavorites();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTeachers = async () => {
      if (!favoriteIds.length) {
        setTeachers([]);
        return;
      }

      setIsLoadingTeachers(true);

      try {
        const result = await teachersService.getByIds(favoriteIds);

        if (isMounted) {
          setTeachers(result);
        }
      } catch (error) {
        console.error('Failed to load favorite teachers:', error);

        if (isMounted) {
          setTeachers([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingTeachers(false);
        }
      }
    };

    loadTeachers();

    return () => {
      isMounted = false;
    };
  }, [favoriteIds]);

  if (isFavoritesLoading || isLoadingTeachers) {
    return <InlineLoader text="Loading favorites..." />;
  }

  if (!favoriteIds.length) {
    return (
      <div className={css.emptyState}>
        <h2 className={css.emptyTitle}>No favorite teachers yet</h2>
        <p className={css.emptyText}>
          Add teachers to your favorites from the Teachers page, and they will
          appear here.
        </p>
      </div>
    );
  }

  return (
    <ul className={css.list}>
      {teachers.map((teacher) => (
        <li key={teacher.id} className={css.item}>
          <TeacherCard teacher={teacher} />
        </li>
      ))}
    </ul>
  );
}

export default FavoritesTeachers;
