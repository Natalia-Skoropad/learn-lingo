import * as yup from 'yup';

import type { RegisterFormValues } from '@/types/forms';
import {
  emailSchema,
  fullNameSchema,
  passwordSchema,
} from '@/lib/validations/commonFields';

//===============================================================

export const registerSchema: yup.ObjectSchema<RegisterFormValues> = yup
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .required();
