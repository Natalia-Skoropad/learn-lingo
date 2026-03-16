'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import type { Teacher } from '@/types/teacher';
import type { TeacherFilters as TeacherFiltersType } from '@/types/filters';
import { DEFAULT_TEACHER_FILTERS } from '@/types/filters';
import { buildTeachersPath } from '@/lib/utils/teachers.query';

import EmptyState from '@/components/common/EmptyState/EmptyState';
import TeacherCard from '@/components/teachers/TeacherCard/TeacherCard';
import TeacherFilters from '@/components/teachers/TeacherFilters/TeacherFilters';
import TeachersPagination from '@/components/teachers/TeachersPagination/TeachersPagination';
import TeachersSeoText from '@/components/teachers/TeachersSeoText/TeachersSeoText';

import css from './TeachersList.module.css';

//===============================================================

type Props = {
  initialTeachers: Teacher[];
  initialTotal: number;
  initialFilters: TeacherFiltersType;
  initialPage: number;
  seoText: {
    heading: string;
    paragraphs: string[];
  } | null;
};

//===============================================================

function TeachersList({
  initialTeachers,
  initialTotal,
  initialFilters,
  initialPage,
  seoText,
}: Props) {
  const router = useRouter();

  const filters = initialFilters;
  const currentPage = initialPage;
  const total = initialTotal;
  const teachers = initialTeachers;

  const appliedFiltersCount = useMemo(() => {
    let count = 0;

    if (filters.language !== DEFAULT_TEACHER_FILTERS.language) count += 1;
    if (filters.level !== DEFAULT_TEACHER_FILTERS.level) count += 1;
    if (filters.price !== DEFAULT_TEACHER_FILTERS.price) count += 1;

    return count;
  }, [filters]);

  const pageCount = Math.ceil(total / 4);

  const handleFiltersChange = useCallback(
    (nextFilters: TeacherFiltersType) => {
      router.push(buildTeachersPath(nextFilters, 1));
    },
    [router]
  );

  return (
    <>
      <TeacherFilters
        filters={filters}
        onChange={handleFiltersChange}
        appliedFiltersCount={appliedFiltersCount}
        total={total}
      />

      {teachers.length ? (
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

      <TeachersPagination
        currentPage={currentPage}
        pageCount={pageCount}
        filters={filters}
      />

      {currentPage === 1 && total > 0 && seoText ? (
        <TeachersSeoText
          heading={seoText.heading}
          paragraphs={seoText.paragraphs}
        />
      ) : null}
    </>
  );
}

export default TeachersList;
