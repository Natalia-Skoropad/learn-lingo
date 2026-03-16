export type TeacherSort =
  | 'A to Z'
  | 'Z to A'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Rating: low to high'
  | 'Rating: high to low'
  | 'Lessons: low to high'
  | 'Lessons: high to low';

//===============================================================

export type TeacherFilters = {
  language: string;
  level: string;
  price: string;
  sort: TeacherSort;
};

export const DEFAULT_TEACHER_FILTERS: TeacherFilters = {
  language: 'All',
  level: 'All',
  price: 'All',
  sort: 'A to Z',
};
