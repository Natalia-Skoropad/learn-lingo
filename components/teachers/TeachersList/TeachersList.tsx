import type { Teacher } from '@/types/teacher';
import type { TeacherFilters as TeacherFiltersType } from '@/types/filters';
import { DEFAULT_TEACHER_FILTERS } from '@/types/filters';

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
  keyword: string;
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
  keyword,
  seoText,
}: Props) {
  const filters = initialFilters;
  const currentPage = initialPage;
  const total = initialTotal;
  const teachers = initialTeachers;

  let appliedFiltersCount = 0;

  if (filters.language !== DEFAULT_TEACHER_FILTERS.language) {
    appliedFiltersCount += 1;
  }

  if (filters.level !== DEFAULT_TEACHER_FILTERS.level) {
    appliedFiltersCount += 1;
  }

  if (filters.price !== DEFAULT_TEACHER_FILTERS.price) {
    appliedFiltersCount += 1;
  }

  const pageCount = Math.ceil(total / 4);

  const emptyStateText = keyword
    ? `No teachers match your search. Try another keyword or change the selected filters.`
    : 'Try changing the selected filters to see more results.';

  return (
    <>
      <TeacherFilters
        filters={filters}
        keyword={keyword}
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
        <EmptyState title="No teachers found" text={emptyStateText} />
      )}

      <TeachersPagination
        currentPage={currentPage}
        pageCount={pageCount}
        filters={filters}
        keyword={keyword}
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
