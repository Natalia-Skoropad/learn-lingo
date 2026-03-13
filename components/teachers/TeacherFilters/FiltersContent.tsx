'use client';

import { useState } from 'react';
import clsx from 'clsx';

import type { TeacherFilters as TeacherFiltersType } from '@/types/filters';
import { DEFAULT_TEACHER_FILTERS } from '@/types/filters';
import {
  LANGUAGE_OPTIONS,
  LEVEL_OPTIONS,
  PRICE_OPTIONS,
} from '@/lib/constants/filters';

import FilterSelect from './FilterSelect';
import ResetFiltersButton from './ResetFiltersButton';

import css from './TeacherFilters.module.css';

//===============================================================

type Props = {
  filters: TeacherFiltersType;
  onChange: (nextFilters: TeacherFiltersType) => void;
  appliedFiltersCount: number;
  layout: 'desktop' | 'drawer';
};

type FilterField = keyof TeacherFiltersType;

//===============================================================

function FiltersContent({
  filters,
  onChange,
  appliedFiltersCount,
  layout,
}: Props) {
  const [openField, setOpenField] = useState<FilterField | null>(null);

  const hasAppliedFilters = appliedFiltersCount > 0;

  const handleSelect = (field: FilterField, value: string): void => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  const handleToggle = (field: FilterField): void => {
    setOpenField((prev) => (prev === field ? null : field));
  };

  const handleClose = (): void => {
    setOpenField(null);
  };

  const handleReset = (): void => {
    onChange(DEFAULT_TEACHER_FILTERS);
    setOpenField(null);
  };

  const formatPriceOption = (option: string): string => {
    return option === 'All' ? option : `${option} $`;
  };

  return (
    <div
      className={clsx(
        css.contentWrap,
        layout === 'desktop' ? css.contentWrapDesktop : css.contentWrapDrawer
      )}
    >
      <div className={css.fieldsRow}>
        <FilterSelect
          id="language"
          label="Languages"
          value={filters.language}
          defaultValue={DEFAULT_TEACHER_FILTERS.language}
          options={LANGUAGE_OPTIONS}
          onSelect={handleSelect}
          isOpen={openField === 'language'}
          onToggle={handleToggle}
          onClose={handleClose}
        />

        <FilterSelect
          id="level"
          label="Level of knowledge"
          value={filters.level}
          defaultValue={DEFAULT_TEACHER_FILTERS.level}
          options={LEVEL_OPTIONS}
          onSelect={handleSelect}
          isOpen={openField === 'level'}
          onToggle={handleToggle}
          onClose={handleClose}
        />

        <FilterSelect
          id="price"
          label="Price"
          value={filters.price}
          defaultValue={DEFAULT_TEACHER_FILTERS.price}
          options={PRICE_OPTIONS}
          onSelect={handleSelect}
          isOpen={openField === 'price'}
          onToggle={handleToggle}
          onClose={handleClose}
          formatOption={formatPriceOption}
        />
      </div>

      {hasAppliedFilters ? (
        <ResetFiltersButton count={appliedFiltersCount} onClick={handleReset} />
      ) : null}
    </div>
  );
}

export default FiltersContent;
