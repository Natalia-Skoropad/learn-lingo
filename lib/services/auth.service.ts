import {
  loginUser,
  logoutUser,
  observeAuthState,
  registerUser,
} from '@/lib/firebase/auth';

//===============================================================

export const authService = {
  register: registerUser,
  login: loginUser,
  logout: logoutUser,
  observeAuthState,
};
