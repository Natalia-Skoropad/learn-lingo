import * as yup from 'yup';

import type { ForgotPasswordFormValues } from '@/types/forms';
import { emailSchema } from '@/lib/validations/commonFields';

//===============================================================

export const forgotPasswordSchema: yup.ObjectSchema<ForgotPasswordFormValues> =
  yup
    .object({
      email: emailSchema,
    })
    .required();
