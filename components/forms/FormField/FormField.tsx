'use client';

import clsx from 'clsx';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import css from './FormField.module.css';

//===============================================================

type BaseProps = {
  label: string;
  error?: string;
  count?: number;
  maxLength?: number;
  requiredMark?: boolean;
  className?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: 'input';
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: 'textarea';
  };

type Props = InputProps | TextareaProps;

//===============================================================

function FormField(props: Props) {
  const {
    label,
    error,
    count,
    maxLength,
    requiredMark = false,
    className,
  } = props;

  const hasCounter = typeof count === 'number' && typeof maxLength === 'number';

  return (
    <div className={css.wrapper}>
      <div
        className={clsx(css.fieldBox, error && css.fieldBoxError, className)}
      >
        <label className={css.label}>
          {label}
          {requiredMark ? <span className={css.required}>*</span> : null}
        </label>

        {'as' in props && props.as === 'textarea' ? (
          <textarea {...props} className={css.textarea} placeholder=" " />
        ) : (
          <input {...props} className={css.input} placeholder=" " />
        )}

        {hasCounter ? (
          <span className={css.counter}>
            {count}/{maxLength}
          </span>
        ) : null}

        <span className={clsx(css.error, error && css.errorVisible)}>
          {error || ' '}
        </span>
      </div>
    </div>
  );
}

export default FormField;
