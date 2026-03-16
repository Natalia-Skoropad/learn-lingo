'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isTextarea = props.as === 'textarea';
  const isPasswordField = !isTextarea && props.type === 'password';

  const hasCounter =
    !isPasswordField &&
    typeof props.count === 'number' &&
    typeof props.maxLength === 'number';

  const fieldBoxClassName = clsx(
    css.fieldBox,
    props.error && css.fieldBoxError,
    props.className
  );

  if (isTextarea) {
    const {
      error,
      count,
      className: _className,
      maxLength,
      as: _as,
      ...textareaProps
    } = props;

    void _className;
    void _as;

    return (
      <div className={css.wrapper}>
        <div className={fieldBoxClassName}>
          <textarea
            {...textareaProps}
            maxLength={maxLength}
            className={css.textarea}
          />

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

  const {
    type,
    error,
    count,
    className: _className,
    maxLength,
    as: _as,
    ...inputProps
  } = props;

  void _className;
  void _as;

  return (
    <div className={css.wrapper}>
      <div className={fieldBoxClassName}>
        <input
          {...inputProps}
          type={isPasswordField && isPasswordVisible ? 'text' : type}
          maxLength={maxLength}
          className={clsx(css.input, isPasswordField && css.inputWithIcon)}
        />

        {hasCounter ? (
          <span className={css.counter}>
            {count}/{maxLength}
          </span>
        ) : null}

        {isPasswordField ? (
          <button
            type="button"
            className={css.toggleButton}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isPasswordVisible}
          >
            {isPasswordVisible ? (
              <EyeOff className={css.toggleIcon} />
            ) : (
              <Eye className={css.toggleIcon} />
            )}
          </button>
        ) : null}

        <span className={clsx(css.error, error && css.errorVisible)}>
          {error || ' '}
        </span>
      </div>
    </div>
  );
}

export default FormField;
