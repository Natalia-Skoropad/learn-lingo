'use client';

import { useEffect, useState } from 'react';

import type { Teacher } from '@/types/teacher';

import EmptyState from '@/components/common/EmptyState/EmptyState';
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
      <EmptyState
        title="No favorite teachers yet"
        text="Add teachers to your favorites from the Teachers page, and they will appear here."
      />
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
