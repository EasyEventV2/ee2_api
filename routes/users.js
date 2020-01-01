import { Router } from 'express';
import verifyToken from 'middlewares/verifyToken';
import verifyUser from 'middlewares/verifyUser';
import userController from 'controllers/users.controller';
import eventController from 'controllers/events.controller';

const router = Router();

router.route('/')
  .post(userController.createNewUser);

router.route('/:userId')
  .get(verifyToken, verifyUser, userController.getUserById)
  .put(userController.updateUser);

router.route('/:userId/events')
  .get(verifyToken, verifyUser, eventController.getEventsByUserId);

export default router;
