'use client';

import Link from 'next/link';
import clsx from 'clsx';

import type { TeacherFilters } from '@/types/filters';

import { buildTeachersPathWithSearch } from '@/lib/utils/teachers.query';

import css from './TeachersPagination.module.css';

//===============================================================

type Props = {
  currentPage: number;
  pageCount: number;
  filters: TeacherFilters;
  keyword: string;
};

//===============================================================

function getVisiblePages(
  currentPage: number,
  pageCount: number
): (number | 'dots')[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5, 'dots', pageCount];
  }

  if (currentPage >= pageCount - 2) {
    return [
      1,
      'dots',
      pageCount - 4,
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  }

  return [
    1,
    'dots',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'dots',
    pageCount,
  ];
}

//===============================================================

function TeachersPagination({
  currentPage,
  pageCount,
  filters,
  keyword,
}: Props) {
  if (pageCount <= 1) return null;

  const pages = getVisiblePages(currentPage, pageCount);

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav className={css.wrap} aria-label="Pagination">
      <ul className={css.pagination}>
        <li className={css.pageItem}>
          {currentPage > 1 ? (
            <Link
              href={buildTeachersPathWithSearch(filters, prevPage, keyword)}
              className={clsx(css.pageLink, css.controlLink)}
              aria-label="Previous page"
              rel="prev"
            >
              ‹
            </Link>
          ) : (
            <span
              className={clsx(css.pageLink, css.controlLink, css.disabled)}
              aria-disabled="true"
            >
              ‹
            </span>
          )}
        </li>

        {pages.map((page, index) => (
          <li key={`${page}-${index}`} className={css.pageItem}>
            {page === 'dots' ? (
              <span
                className={clsx(css.pageLink, css.breakLink)}
                aria-hidden="true"
              >
                ...
              </span>
            ) : page === currentPage ? (
              <span
                className={clsx(css.pageLink, css.pageLinkActive)}
                aria-current="page"
              >
                {page}
              </span>
            ) : (
              <Link
                href={buildTeachersPathWithSearch(filters, page, keyword)}
                className={css.pageLink}
                aria-label={`Page ${page}`}
                rel={page < currentPage ? 'prev' : 'next'}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        <li className={css.pageItem}>
          {currentPage < pageCount ? (
            <Link
              href={buildTeachersPathWithSearch(filters, nextPage, keyword)}
              className={clsx(css.pageLink, css.controlLink)}
              aria-label="Next page"
              rel="next"
            >
              ›
            </Link>
          ) : (
            <span
              className={clsx(css.pageLink, css.controlLink, css.disabled)}
              aria-disabled="true"
            >
              ›
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default TeachersPagination;
