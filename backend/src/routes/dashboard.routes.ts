import { Router } from 'express';
import { getAdminDashboard, getTeacherDashboard, getStudentDashboard, getParentDashboard } from '../controllers/dashboard.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/admin', authorize(Role.ADMIN), getAdminDashboard);
router.get('/teacher', authorize(Role.TEACHER), getTeacherDashboard);
router.get('/student', authorize(Role.STUDENT), getStudentDashboard);
router.get('/parent', authorize(Role.PARENT), getParentDashboard);

export default router;
