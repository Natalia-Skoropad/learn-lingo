'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { Teacher } from '@/types/teacher';
import type { TeacherFilters as TeacherFiltersType } from '@/types/filters';
import { DEFAULT_TEACHER_FILTERS } from '@/types/filters';

import EmptyState from '@/components/common/EmptyState/EmptyState';
import InlineLoader from '@/components/common/InlineLoader/InlineLoader';
import TeacherCard from '@/components/teachers/TeacherCard/TeacherCard';
import TeacherFilters from '@/components/teachers/TeacherFilters/TeacherFilters';
import { teachersService } from '@/lib/services/teachers.service';

import css from './TeachersList.module.css';

//===============================================================

type Props = {
  initialTeachers: Teacher[];
  initialNextOffset: number | null;
  initialHasMore: boolean;
  initialTotal: number;
};

//===============================================================

function TeachersList({
  initialTeachers,
  initialNextOffset,
  initialHasMore,
  initialTotal,
}: Props) {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [nextOffset, setNextOffset] = useState<number | null>(
    initialNextOffset
  );
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [total, setTotal] = useState(initialTotal);

  const [filters, setFilters] = useState<TeacherFiltersType>(
    DEFAULT_TEACHER_FILTERS
  );

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const appliedFiltersCount = useMemo(() => {
    let count = 0;

    if (filters.language !== DEFAULT_TEACHER_FILTERS.language) count += 1;
    if (filters.level !== DEFAULT_TEACHER_FILTERS.level) count += 1;
    if (filters.price !== DEFAULT_TEACHER_FILTERS.price) count += 1;

    return count;
  }, [filters]);

  const loadTeachersByFilters = useCallback(
    async (nextFilters: TeacherFiltersType) => {
      setIsFiltering(true);

      try {
        const result = await teachersService.getPage(nextFilters);

        setTeachers(result.teachers);
        setNextOffset(result.nextOffset);
        setHasMore(result.hasMore);
        setTotal(result.total);
      } catch (error) {
        console.error('Failed to filter teachers:', error);
      } finally {
        setIsFiltering(false);
      }
    },
    []
  );

  const loadMoreTeachers = useCallback(async () => {
    if (isLoadingMore || isFiltering || !hasMore || nextOffset === null) return;

    setIsLoadingMore(true);

    try {
      const result = await teachersService.getPage(filters, nextOffset);

      setTeachers((prev) => [...prev, ...result.teachers]);
      setNextOffset(result.nextOffset);
      setHasMore(result.hasMore);
      setTotal(result.total);
    } catch (error) {
      console.error('Failed to load more teachers:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [filters, hasMore, isFiltering, isLoadingMore, nextOffset]);

  const handleFiltersChange = useCallback(
    async (nextFilters: TeacherFiltersType) => {
      setFilters(nextFilters);
      await loadTeachersByFilters(nextFilters);
    },
    [loadTeachersByFilters]
  );

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0]?.isIntersecting &&
            hasMore &&
            !isLoadingMore &&
            !isFiltering
          ) {
            loadMoreTeachers();
          }
        },
        {
          rootMargin: '200px 0px',
        }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [hasMore, isFiltering, isLoadingMore, loadMoreTeachers]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <TeacherFilters
        filters={filters}
        onChange={handleFiltersChange}
        appliedFiltersCount={appliedFiltersCount}
        total={total}
      />

      {isFiltering ? (
        <InlineLoader className={css.loader} text="Loading teachers..." />
      ) : teachers.length ? (
        <ul className={css.list}>
          {teachers.map((teacher) => (
            <li key={teacher.id} className={css.item}>
              <TeacherCard teacher={teacher} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No teachers found"
          text="Try changing the selected filters to see more results."
        />
      )}

      {!isFiltering && isLoadingMore ? (
        <InlineLoader className={css.loader} text="Loading teachers..." />
      ) : null}

      {!isFiltering && hasMore ? (
        <div ref={sentinelRef} className={css.sentinel} />
      ) : null}
    </>
  );
}

export default TeachersList;
