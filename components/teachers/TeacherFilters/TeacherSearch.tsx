'use client';

import { Search, X } from 'lucide-react';

import css from './TeacherFilters.module.css';

//===============================================================

type Props = {
  value: string;
  onChange: (value: string) => void;
};

//===============================================================

function TeacherSearch({ value, onChange }: Props) {
  return (
    <div className={css.searchField}>
      <label className={css.label} htmlFor="teachers-search">
        Search
      </label>

      <div className={css.searchBox}>
        <Search className={css.searchIcon} aria-hidden="true" />

        <input
          id="teachers-search"
          type="search"
          value={value}
          className={css.searchInput}
          placeholder="Search"
          autoComplete="off"
          maxLength={40}
          onChange={(event) => onChange(event.target.value)}
        />

        {value ? (
          <button
            type="button"
            className={css.searchClearBtn}
            aria-label="Clear search"
            onClick={() => onChange('')}
          >
            <X className={css.searchClearIcon} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default TeacherSearch;
