'use client';

import { useId } from 'react';
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
  const reactId = useId();

  const displayValue = formatOption ? formatOption(value) : value;
  const isApplied = value !== defaultValue;

  const triggerId = `${reactId}-${id}-trigger`;
  const listboxId = `${reactId}-${id}-listbox`;

  return (
    <div className={css.field}>
      <span className={css.label}>{label}</span>

      <div className={css.dropdown}>
        <button
          id={triggerId}
          type="button"
          className={clsx(
            css.trigger,
            isOpen && css.triggerOpen,
            isApplied && css.triggerApplied
          )}
          onClick={() => onToggle(id)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-label={`${label}: ${displayValue}`}
        >
          <span className={css.triggerText}>{displayValue}</span>

          <ChevronDown
            className={clsx(css.chevron, isOpen && css.chevronOpen)}
            aria-hidden="true"
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
              id={listboxId}
              className={clsx(css.menu, css.menuOpen)}
              role="listbox"
              aria-labelledby={triggerId}
            >
              {options.map((option) => {
                const isSelected = option === value;
                const optionLabel = formatOption
                  ? formatOption(option)
                  : option;

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
                      {optionLabel}
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
