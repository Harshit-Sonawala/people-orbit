export type AuthSession = {
  id: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: number;
};
