'use client';

import { useCallback, useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

import type { TeacherFilters as TeacherFiltersType } from '@/types/filters';

import FiltersContent from './FiltersContent';
import FiltersDrawer from './FiltersDrawer';

import css from './TeacherFilters.module.css';

//===============================================================

type Props = {
  filters: TeacherFiltersType;
  onChange: (nextFilters: TeacherFiltersType) => void;
  appliedFiltersCount: number;
  total: number;
};

//===============================================================

function TeacherFilters({
  filters,
  onChange,
  appliedFiltersCount,
  total,
}: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const resultsLabel = useMemo(() => {
    return `${total} teacher${total === 1 ? '' : 's'}`;
  }, [total]);

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
            onChange={onChange}
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
            onChange={onChange}
            appliedFiltersCount={appliedFiltersCount}
            layout="drawer"
          />
        </FiltersDrawer>
      </div>
    </div>
  );
}

export default TeacherFilters;
