'use client';

import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

import type { TeacherFilters as TeacherFiltersType } from '@/types/filters';

import css from './TeacherFilters.module.css';

//===============================================================

type FilterField = keyof TeacherFiltersType;

type Props = {
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
}: Props) {
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

export default FilterSelect;
