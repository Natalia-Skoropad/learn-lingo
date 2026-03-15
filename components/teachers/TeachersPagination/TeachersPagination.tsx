'use client';

import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';

import type { TeacherFilters } from '@/types/filters';
import { buildTeachersPath } from '@/lib/server/teachers/teachers.query';

import css from './TeachersPagination.module.css';

//===============================================================

type Props = {
  currentPage: number;
  pageCount: number;
  filters: TeacherFilters;
};

//===============================================================

function TeachersPagination({ currentPage, pageCount, filters }: Props) {
  const router = useRouter();

  const handlePageChange = ({ selected }: { selected: number }) => {
    const nextPage = selected + 1;
    router.push(buildTeachersPath(filters, nextPage));
  };

  if (pageCount <= 1) return null;

  return (
    <div className={css.wrap}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={null}
        previousLabel={null}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        forcePage={currentPage - 1}
        onPageChange={handlePageChange}
        containerClassName={css.pagination}
        pageClassName={css.pageItem}
        pageLinkClassName={css.pageLink}
        activeClassName={css.pageItemActive}
        breakClassName={css.breakItem}
        breakLinkClassName={css.breakLink}
        disabledClassName={css.disabled}
      />
    </div>
  );
}

export default TeachersPagination;
