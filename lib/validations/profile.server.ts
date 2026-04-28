import 'server-only';

//===============================================================

const NAME_REGEX = /^[A-Za-zА-Яа-яІіЇїЄєҐґ'’ -]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

//===============================================================

export function validateProfileName(value: string): string {
  const name = value.trim().replace(/\s+/g, ' ');

  if (name.length < 2 || name.length > 20) {
    throw new Error('Name must contain 2–20 characters');
  }

  if (!NAME_REGEX.test(name)) {
    throw new Error(
      'Name can contain only letters, spaces, apostrophes, and hyphens'
    );
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
    throw new Error('Enter a valid phone number');
  }

  return phone;
}
