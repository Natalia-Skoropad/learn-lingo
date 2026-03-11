import * as yup from 'yup';

import type { BookLessonFormValues } from '@/types/forms';
import {
  emailSchema,
  fullNameSchema,
  phoneSchema,
} from '@/lib/validations/commonFields';

//===============================================================

export const bookLessonSchema: yup.ObjectSchema<BookLessonFormValues> = yup
  .object({
    reason: yup.mixed<BookLessonFormValues['reason']>().required('Required'),
    fullName: fullNameSchema,
    email: emailSchema,
    phone: phoneSchema,
  })
  .required();
