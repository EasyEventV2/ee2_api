import { Router } from 'express';
import userController from 'controllers/users';
import eventController from 'controllers/events';

const router = Router();

router.route('/:userId')
  .get(userController.getUserById);

router.route('/:userId/events')
  .get(eventController.getEventsByUserId);

router.route('/login')
  .post(userController.login);

export default router;
