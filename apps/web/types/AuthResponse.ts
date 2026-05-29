import { User } from ".";

export type AuthResponse = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};
