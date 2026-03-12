import { getTeachersByIds, getTeachersPage } from '@/lib/firebase/teachers';

//===============================================================

export const teachersService = {
  getPage: getTeachersPage,
  getByIds: getTeachersByIds,
};
