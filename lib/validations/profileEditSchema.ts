import * as yup from 'yup';

import type { ProfileEditField } from '@/types/profile';

import {
  emailSchema,
  fullNameSchema,
  phoneSchema,
} from '@/lib/validations/commonFields';

//===============================================================

export type ProfileEditFormValues = {
  value: string;
};

//===============================================================

export function createProfileEditSchema(
  field: ProfileEditField
): yup.ObjectSchema<ProfileEditFormValues> {
  if (field === 'email') {
    return yup
      .object({
        value: emailSchema,
      })
      .required();
  }

  if (field === 'phone') {
    return yup
      .object({
        value: phoneSchema,
      })
      .required();
  }

  return yup
    .object({
      value: fullNameSchema,
    })
    .required();
}
