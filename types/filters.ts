export type TeacherFilters = {
  language: string;
  level: string;
  price: string;
};

export const DEFAULT_TEACHER_FILTERS: TeacherFilters = {
  language: 'All',
  level: 'All',
  price: 'All',
};
