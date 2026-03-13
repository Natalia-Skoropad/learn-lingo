'use client';

import { X } from 'lucide-react';

import css from './TeacherFilters.module.css';

//===============================================================

type Props = {
  count: number;
  onClick: () => void;
};

//===============================================================

function ResetFiltersButton({ count, onClick }: Props) {
  return (
    <button type="button" className={css.resetBtn} onClick={onClick}>
      <X className={css.resetBtnIcon} />
      <span className={css.resetBtnLabel}>Reset filters ({count})</span>
    </button>
  );
}

export default ResetFiltersButton;
