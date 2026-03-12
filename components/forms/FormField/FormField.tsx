'use client';

import clsx from 'clsx';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import css from './FormField.module.css';

//===============================================================

type BaseProps = {
  error?: string;
  count?: number;
  maxLength?: number;
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
  const hasCounter =
    typeof props.count === 'number' && typeof props.maxLength === 'number';

  const fieldBoxClassName = clsx(
    css.fieldBox,
    props.error && css.fieldBoxError,
    props.className
  );

  return (
    <div className={css.wrapper}>
      <div className={fieldBoxClassName}>
        {props.as === 'textarea' ? (
          <textarea {...props} className={css.textarea} />
        ) : (
          <input {...props} className={css.input} />
        )}

        {hasCounter ? (
          <span className={css.counter}>
            {props.count}/{props.maxLength}
          </span>
        ) : null}

        <span className={clsx(css.error, props.error && css.errorVisible)}>
          {props.error || ' '}
        </span>
      </div>
    </div>
  );
}

export default FormField;
