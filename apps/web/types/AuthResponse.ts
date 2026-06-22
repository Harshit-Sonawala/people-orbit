import { User } from ".";

export type AuthResponse = {
  userId: string;
  user: User | null;
  accessToken: string;
  refreshToken: string;
};
