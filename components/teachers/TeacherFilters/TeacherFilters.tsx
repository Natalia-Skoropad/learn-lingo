'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

import type { TeacherFilters as TeacherFiltersType } from '@/types/filters';
import { DEFAULT_TEACHER_FILTERS } from '@/types/filters';
import {
  LANGUAGE_OPTIONS,
  LEVEL_OPTIONS,
  PRICE_OPTIONS,
} from '@/lib/constants/filters';

import css from './TeacherFilters.module.css';

//===============================================================

type Props = {
  filters: TeacherFiltersType;
  onChange: (nextFilters: TeacherFiltersType) => void;
  appliedFiltersCount: number;
};

//===============================================================

type FilterField = keyof TeacherFiltersType;

type FilterSelectProps = {
  id: FilterField;
  label: string;
  value: string;
  defaultValue: string;
  options: string[];
  onSelect: (field: FilterField, value: string) => void;
  isOpen: boolean;
  onToggle: (field: FilterField) => void;
  onClose: () => void;
  formatOption?: (option: string) => string;
};

//===============================================================

function FilterSelect({
  id,
  label,
  value,
  defaultValue,
  options,
  onSelect,
  isOpen,
  onToggle,
  onClose,
  formatOption,
}: FilterSelectProps) {
  const displayValue = formatOption ? formatOption(value) : value;
  const isApplied = value !== defaultValue;

  return (
    <div className={css.field}>
      <span className={css.label}>{label}</span>

      <div className={css.dropdown}>
        <button
          type="button"
          className={clsx(
            css.trigger,
            isOpen && css.triggerOpen,
            isApplied && css.triggerApplied
          )}
          onClick={() => onToggle(id)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
        >
          <span className={css.triggerText}>{displayValue}</span>
          <ChevronDown
            className={clsx(css.chevron, isOpen && css.chevronOpen)}
          />
        </button>

        {isOpen ? (
          <>
            <button
              type="button"
              className={css.backdrop}
              onClick={onClose}
              aria-label={`Close ${label} filter`}
            />

            <ul
              id={`${id}-listbox`}
              className={clsx(css.menu, css.menuOpen)}
              role="listbox"
              aria-label={label}
            >
              {options.map((option) => {
                const isSelected = option === value;

                return (
                  <li key={option} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      className={clsx(
                        css.option,
                        isSelected && css.optionSelected
                      )}
                      onClick={() => {
                        onSelect(id, option);
                        onClose();
                      }}
                    >
                      {formatOption ? formatOption(option) : option}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}

//===============================================================

function TeacherFilters({ filters, onChange, appliedFiltersCount }: Props) {
  const [openField, setOpenField] = useState<FilterField | null>(null);

  const hasAppliedFilters = useMemo(() => {
    return appliedFiltersCount > 0;
  }, [appliedFiltersCount]);

  const handleSelect = (field: FilterField, value: string) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  const handleToggle = (field: FilterField) => {
    setOpenField((prev) => (prev === field ? null : field));
  };

  const handleClose = () => {
    setOpenField(null);
  };

  const handleReset = () => {
    onChange(DEFAULT_TEACHER_FILTERS);
    setOpenField(null);
  };

  const formatPriceOption = (option: string) => {
    return option === 'All' ? option : `${option} $`;
  };

  return (
    <div className={css.wrap}>
      <div className={css.row}>
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
        <button type="button" className={css.resetBtn} onClick={handleReset}>
          Reset filters ({appliedFiltersCount})
        </button>
      ) : null}
    </div>
  );
}

export default TeacherFilters;
