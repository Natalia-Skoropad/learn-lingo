import {
  addTeacherToFavorites,
  getUserFavoriteIds,
  removeTeacherFromFavorites,
} from '@/lib/firebase/favorites';

//===============================================================

export const favoritesService = {
  getIds: getUserFavoriteIds,
  add: addTeacherToFavorites,
  remove: removeTeacherFromFavorites,
};
