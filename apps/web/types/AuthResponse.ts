import { User } from ".";

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
