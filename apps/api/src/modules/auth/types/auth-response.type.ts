import type { User } from '@/modules/users/types';

export type AuthResponse = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};
