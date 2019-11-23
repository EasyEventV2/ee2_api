import { Router } from 'express';
import verifyToken from 'middlewares/verifyToken';
import userController from 'controllers/users';
import eventController from 'controllers/events';

const router = Router();

router.route('/:userId')
  .get(userController.getUserById);

router.route('/:userId/events')
  .get(verifyToken, eventController.getEventsByUserId);

router.route('/login')
  .post(userController.login);

export default router;
