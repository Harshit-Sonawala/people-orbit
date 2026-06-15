export type AuthSession = {
  sessionId: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: number;
};
