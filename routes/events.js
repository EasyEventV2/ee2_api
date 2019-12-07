import { Router } from 'express';
import eventController from 'controllers/events.controller';

const router = Router();

router.route('/:eventId')
  .get(eventController.getEventInfo);

export default router;
