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
    return (
      <div className={css.wrapper}>
        <div className={fieldBoxClassName}>
          <textarea {...props} className={css.textarea} />

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

  const { type, ...inputProps } = props;

  return (
    <div className={css.wrapper}>
      <div className={fieldBoxClassName}>
        <input
          {...inputProps}
          type={isPasswordField && isPasswordVisible ? 'text' : type}
          className={clsx(css.input, isPasswordField && css.inputWithIcon)}
        />

        {hasCounter ? (
          <span className={css.counter}>
            {props.count}/{props.maxLength}
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

        <span className={clsx(css.error, props.error && css.errorVisible)}>
          {props.error || ' '}
        </span>
      </div>
    </div>
  );
}

export default FormField;
