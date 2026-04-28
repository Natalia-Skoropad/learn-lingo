export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  favorites: string[];
  createdAt?: string;
  updatedAt?: string;
};
