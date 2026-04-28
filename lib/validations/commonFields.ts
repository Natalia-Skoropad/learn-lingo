import * as yup from 'yup';

import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_REGEX,
  NAME_REGEX,
  VALIDATION_MESSAGES,
} from '@/lib/validations/validationRules';

//===============================================================

export const fullNameSchema = yup
  .string()
  .trim()
  .min(NAME_MIN_LENGTH, VALIDATION_MESSAGES.nameMin)
  .max(NAME_MAX_LENGTH, VALIDATION_MESSAGES.nameMax)
  .matches(NAME_REGEX, VALIDATION_MESSAGES.nameInvalid)
  .required(VALIDATION_MESSAGES.required);

export const emailSchema = yup
  .string()
  .trim()
  .email(VALIDATION_MESSAGES.emailInvalid)
  .max(EMAIL_MAX_LENGTH, VALIDATION_MESSAGES.emailMax)
  .required(VALIDATION_MESSAGES.required);

export const passwordSchema = yup
  .string()
  .trim()
  .min(PASSWORD_MIN_LENGTH, VALIDATION_MESSAGES.passwordMin)
  .max(PASSWORD_MAX_LENGTH, VALIDATION_MESSAGES.passwordMax)
  .required(VALIDATION_MESSAGES.required);

export const phoneSchema = yup
  .string()
  .trim()
  .matches(PHONE_REGEX, VALIDATION_MESSAGES.phoneInvalid)
  .required(VALIDATION_MESSAGES.required);
