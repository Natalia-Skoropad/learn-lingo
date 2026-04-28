import 'server-only';

import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_REGEX,
  PHONE_REGEX,
  VALIDATION_MESSAGES,
} from '@/lib/validations/validationRules';

//===============================================================

export function validateProfileName(value: string): string {
  const name = value.trim().replace(/\s+/g, ' ');

  if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
    throw new Error(
      `Name must contain ${NAME_MIN_LENGTH}–${NAME_MAX_LENGTH} characters`
    );
  }

  if (!NAME_REGEX.test(name)) {
    throw new Error(VALIDATION_MESSAGES.nameInvalid);
  }

  return name;
}

//===============================================================

export function validateProfilePhone(value: string | null | undefined) {
  const phone = value?.trim();

  if (!phone) {
    return null;
  }

  if (!PHONE_REGEX.test(phone)) {
    throw new Error(VALIDATION_MESSAGES.phoneInvalid);
  }

  return phone;
}
