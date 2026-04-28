import * as yup from 'yup';

import { passwordSchema } from '@/lib/validations/commonFields';
import { VALIDATION_MESSAGES } from '@/lib/validations/validationRules';

//===============================================================

export const resetPasswordConfirmSchema = yup
  .object({
    password: passwordSchema,

    confirmPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref('password')], VALIDATION_MESSAGES.passwordsMustMatch)
      .required(VALIDATION_MESSAGES.required),
  })
  .required();
