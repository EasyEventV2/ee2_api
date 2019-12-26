import { Router } from 'express';
import eventController from 'controllers/events.controller';

const router = Router();

router.route('/')
  .get(eventController.getAllCategories);

export default router;
