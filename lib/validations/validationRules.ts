//===============================================================

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 20;

export const EMAIL_MAX_LENGTH = 64;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const PHONE_MIN_LENGTH = 7;
export const PHONE_MAX_LENGTH = 20;

//===============================================================

export const NAME_REGEX = /^[A-Za-zА-Яа-яІіЇїЄєҐґ'’ -]+$/;
export const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

//===============================================================

export const VALIDATION_MESSAGES = {
  required: 'Required',

  nameMin: `Must be at least ${NAME_MIN_LENGTH} characters`,
  nameMax: `Must be at most ${NAME_MAX_LENGTH} characters`,
  nameInvalid:
    'Name can contain only letters, spaces, apostrophes, and hyphens',

  emailInvalid: 'Enter a valid email',
  emailMax: `Must be at most ${EMAIL_MAX_LENGTH} characters`,

  passwordMin: `Must be at least ${PASSWORD_MIN_LENGTH} characters`,
  passwordMax: `Must be at most ${PASSWORD_MAX_LENGTH} characters`,
  passwordsMustMatch: 'Passwords must match',

  phoneInvalid: 'Enter a valid phone number',
} as const;
