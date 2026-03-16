import type { TeacherSort } from '@/types/filters';

export const LANGUAGE_OPTIONS = [
  'All',
  'French',
  'English',
  'German',
  'Spanish',
  'Italian',
  'Korean',
  'Mandarin Chinese',
  'Vietnamese',
];

export const LEVEL_OPTIONS = [
  'All',
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
  'C2 Proficient',
];

export const PRICE_OPTIONS = ['All', '25', '27', '28', '30', '32', '35'];

//===============================================================

export const SORT_OPTIONS: TeacherSort[] = [
  'A to Z',
  'Z to A',
  'Price: low to high',
  'Price: high to low',
  'Rating: low to high',
  'Rating: high to low',
  'Lessons: low to high',
  'Lessons: high to low',
];
