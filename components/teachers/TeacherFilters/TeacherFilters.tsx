'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';

import type { TeacherFilters as TeacherFiltersType } from '@/types/filters';
import { buildTeachersPath } from '@/lib/utils/teachers.query';

import FiltersContent from './FiltersContent';
import FiltersDrawer from './FiltersDrawer';

import css from './TeacherFilters.module.css';

//===============================================================

type Props = {
  filters: TeacherFiltersType;
  appliedFiltersCount: number;
  total: number;
};

//===============================================================

function TeacherFilters({ filters, appliedFiltersCount, total }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const router = useRouter();

  const resultsLabel = useMemo(() => {
    return `${total} teacher${total === 1 ? '' : 's'}`;
  }, [total]);

  const handleFiltersChange = useCallback(
    (nextFilters: TeacherFiltersType) => {
      router.push(buildTeachersPath(nextFilters, 1));
    },
    [router]
  );

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <div className={css.wrap}>
      <div className={css.desktopOnly}>
        <div className={css.desktopTopRow}>
          <FiltersContent
            filters={filters}
            onChange={handleFiltersChange}
            appliedFiltersCount={appliedFiltersCount}
            layout="desktop"
          />
        </div>

        <div className={css.desktopResultsRow}>
          <p className={css.resultsText}>{resultsLabel}</p>
        </div>
      </div>

      <div className={css.mobileTabletOnly}>
        <div className={css.mobileTabletResultsRow}>
          <p className={css.resultsText}>{resultsLabel}</p>

          <button type="button" className={css.filterBtn} onClick={openDrawer}>
            <SlidersHorizontal className={css.filterBtnIcon} />
            <span>
              Filter{appliedFiltersCount > 0 ? ` (${appliedFiltersCount})` : ''}
            </span>
          </button>
        </div>

        <FiltersDrawer isOpen={isDrawerOpen} onClose={closeDrawer}>
          <FiltersContent
            filters={filters}
            onChange={handleFiltersChange}
            appliedFiltersCount={appliedFiltersCount}
            layout="drawer"
          />
        </FiltersDrawer>
      </div>
    </div>
  );
}

export default TeacherFilters;
