import {
  loginUser,
  logoutUser,
  observeAuthState,
  registerUser,
  resetUserPassword,
} from '@/lib/firebase/auth';

//===============================================================

export const authService = {
  register: registerUser,
  login: loginUser,
  logout: logoutUser,
  resetPassword: resetUserPassword,
  observeAuthState,
};
