import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { loginUser, logoutUser } from '../services/auth.service';
import { ApiResponse } from '../utils/apiResponse';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../config/prisma';

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const result = await loginUser(email, password);

  // Set refresh token in HttpOnly cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json(ApiResponse.success({
    user: result.user,
    accessToken: result.accessToken,
  }, 'Login successful'));
});

export const logout = catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  
  if (userId) {
    await logoutUser(userId);
  }

  // Clear cookie
  res.clearCookie('refreshToken');

  res.status(200).json(ApiResponse.success(null, 'Logout successful'));
});

export const getMe = catchAsync(async (req: AuthRequest, res: Response) => {
  // Mock endpoint to test protected route
  res.status(200).json(ApiResponse.success({ user: req.user }, 'User profile fetched'));
});

import { verifyRefreshToken, generateAccessToken } from '../utils/jwt';

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json(ApiResponse.error('Unauthorized: No refresh token provided'));
  }

  try {
    const decoded = verifyRefreshToken(incomingRefreshToken) as { userId: string };
    
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user || !user.isActive) {
      return res.status(401).json(ApiResponse.error('Unauthorized: Invalid user'));
    }

    const accessToken = generateAccessToken(user.id, user.role);

    res.status(200).json(ApiResponse.success({ accessToken }, 'Token refreshed successfully'));
  } catch (error) {
    res.status(401).json(ApiResponse.error('Unauthorized: Invalid or expired refresh token'));
  }
});
