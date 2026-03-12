import * as yup from 'yup';

//===============================================================

export const fullNameSchema = yup
  .string()
  .trim()
  .min(2, 'Must be at least 2 characters')
  .max(20, 'Must be at most 20 characters')
  .required('Required');

export const emailSchema = yup
  .string()
  .trim()
  .email('Enter a valid email')
  .max(64, 'Must be at most 64 characters')
  .required('Required');

export const passwordSchema = yup
  .string()
  .trim()
  .min(6, 'Must be at least 6 characters')
  .max(20, 'Must be at most 20 characters')
  .required('Required');

export const phoneSchema = yup
  .string()
  .trim()
  .matches(/^[+]?[\d\s()-]{7,20}$/, 'Enter a valid phone number')
  .required('Required');
