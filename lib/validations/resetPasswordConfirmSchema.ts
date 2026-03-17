import * as yup from 'yup';

//===============================================================

export const resetPasswordConfirmSchema = yup
  .object({
    password: yup
      .string()
      .trim()
      .min(6, 'Must be at least 6 characters')
      .max(20, 'Must be at most 20 characters')
      .required('Required'),

    confirmPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Required'),
  })
  .required();
