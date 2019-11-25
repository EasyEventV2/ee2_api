import { Router } from 'express';
import authRoutes from 'routes/auth';
import userRoutes from 'routes/users';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
