'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';

import type { TeacherFilters as TeacherFiltersType } from '@/types/filters';
import { buildTeachersPathWithSearch } from '@/lib/utils/teachers.query';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

import FiltersContent from './FiltersContent';
import FiltersDrawer from './FiltersDrawer';
import TeacherSearch from './TeacherSearch';

import css from './TeacherFilters.module.css';

//===============================================================

type Props = {
  filters: TeacherFiltersType;
  keyword: string;
  appliedFiltersCount: number;
  total: number;
};

//===============================================================

function TeacherFilters({
  filters,
  keyword,
  appliedFiltersCount,
  total,
}: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(keyword);

  const debouncedSearchValue = useDebouncedValue(searchValue, 400);

  const router = useRouter();

  const resultsLabel = useMemo(() => {
    return `${total} teacher${total === 1 ? '' : 's'}`;
  }, [total]);

  useEffect(() => {
    setSearchValue(keyword);
  }, [keyword]);

  useEffect(() => {
    const nextKeyword = debouncedSearchValue.trim();

    if (nextKeyword === keyword) return;

    router.push(buildTeachersPathWithSearch(filters, 1, nextKeyword));
  }, [debouncedSearchValue, filters, keyword, router]);

  const handleFiltersChange = (nextFilters: TeacherFiltersType) => {
    router.push(buildTeachersPathWithSearch(nextFilters, 1, keyword));
    setIsDrawerOpen(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={css.wrap}>
      <div className={css.desktopOnly}>
        <div className={css.desktopTopRow}>
          <TeacherSearch value={searchValue} onChange={setSearchValue} />

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
        <div className={css.mobileTabletTopRow}>
          <TeacherSearch value={searchValue} onChange={setSearchValue} />

          <button type="button" className={css.filterBtn} onClick={openDrawer}>
            <SlidersHorizontal className={css.filterBtnIcon} />
            <span>
              Filter{appliedFiltersCount > 0 ? ` (${appliedFiltersCount})` : ''}
            </span>
          </button>
        </div>

        <p className={css.resultsText}>{resultsLabel}</p>

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
