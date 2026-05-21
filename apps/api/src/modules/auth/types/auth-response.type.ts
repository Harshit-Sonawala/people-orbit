import type { User } from '@/modules/users/types';

export type AuthResponse = {
  user: User;
  accessToken: string;
};
