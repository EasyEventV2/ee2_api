import { Router } from 'express';
import authRoutes from 'routes/auth';
import userRoutes from 'routes/users';
import eventRoutes from 'routes/events';
import categoryRoutes from 'routes/category';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/categories', categoryRoutes);

export default router;
