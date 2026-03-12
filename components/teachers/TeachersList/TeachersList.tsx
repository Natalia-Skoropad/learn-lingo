'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { Teacher } from '@/types/teacher';
import TeacherCard from '@/components/teachers/TeacherCard/TeacherCard';
import InlineLoader from '@/components/common/InlineLoader/InlineLoader';
import { teachersService } from '@/lib/services/teachers.service';

import css from './TeachersList.module.css';

//===============================================================

type Props = {
  initialTeachers: Teacher[];
  initialLastId: string | null;
  initialHasMore: boolean;
};

//===============================================================

function TeachersList({
  initialTeachers,
  initialLastId,
  initialHasMore,
}: Props) {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [lastId, setLastId] = useState<string | null>(initialLastId);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMoreTeachers = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    try {
      const result = await teachersService.getPage(lastId);

      setTeachers((prev) => [...prev, ...result.teachers]);
      setLastId(result.lastId);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Failed to load more teachers:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore, lastId]);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && hasMore && !isLoadingMore) {
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
    [hasMore, isLoadingMore, loadMoreTeachers]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <ul className={css.list}>
        {teachers.map((teacher) => (
          <li key={teacher.id} className={css.item}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>

      {isLoadingMore ? (
        <InlineLoader className={css.loader} text="Loading teachers..." />
      ) : null}

      {hasMore ? <div ref={sentinelRef} className={css.sentinel} /> : null}
    </>
  );
}

export default TeachersList;
