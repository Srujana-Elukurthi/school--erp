import prisma from '../config/prisma';
import { CustomError } from '../utils/customError';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.isActive) {
    throw new CustomError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new CustomError(401, 'Invalid email or password');
  }

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async (userId: string) => {
  // In a full implementation, you might want to invalidate the refresh token in the database
  // For now, we will rely on client-side token deletion
  return { success: true };
};
