import { Router } from 'express';
import { getAttendanceTrends } from '../controllers/analytics.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/attendance', getAttendanceTrends);

export default router;
