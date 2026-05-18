import { Router } from 'express';
import authRoutes from './auth.routes';
import dashboardRoutes from './dashboard.routes';
import analyticsRoutes from './analytics.routes';
import { ApiResponse } from '../utils/apiResponse';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json(ApiResponse.success(null, 'Server is running healthily'));
});

// API Routes
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
