import jwt, { SignOptions } from 'jsonwebtoken';

export const generateAccessToken = (userId: string, role: string): string => {
  const options: SignOptions = { expiresIn: (process.env.JWT_ACCESS_EXPIRATION as any) || '15m' };
  return jwt.sign(
    { userId, role },
    process.env.JWT_ACCESS_SECRET || 'access-secret',
    options
  );
};

export const generateRefreshToken = (userId: string): string => {
  const options: SignOptions = { expiresIn: (process.env.JWT_REFRESH_EXPIRATION as any) || '7d' };
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    options
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'access-secret');
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh-secret');
};
