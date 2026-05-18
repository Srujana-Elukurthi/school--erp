import { Router } from 'express';
import { login, logout, getMe, refreshToken } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { loginSchema } from '../validations/auth.validation';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/logout', authenticate, logout);
router.post('/refresh', refreshToken);

// Sample protected route
router.get('/me', authenticate, getMe);

export default router;
