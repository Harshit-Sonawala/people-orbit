import type { User } from '@/modules/users/types';

export type AuthResponse = {
  // user: User;
  userId: string;
  accessToken: string;
  refreshToken: string;
};
