import { User } from ".";

export type AuthResponse = {
  // user: User;
  userId: string;
  accessToken: string;
  refreshToken: string;
};
