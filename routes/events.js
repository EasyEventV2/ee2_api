import eventController from 'controllers/events.controller';
import guestController from 'controllers/guests.controller';
import staffController from 'controllers/staffs.controller';
import { Router } from 'express';
import verifyToken from 'middlewares/verifyToken';

const router = Router();

router.route('/')
  .get(eventController.getAllEvents)
  .post(verifyToken, eventController.createEvent);

router.route('/:eventId')
  .get(eventController.getEventInfo);

router.route('/:eventId/guests')
  .get(verifyToken, guestController.getGuestsByEventId)
  .post(guestController.createGuest);

router.route('/:eventId/staffs')
  .get(verifyToken, staffController.getStaffsByEventId)
  .post(verifyToken, staffController.addStaffToEvent);

router.route('/:eventId/staffs/:staffId')
  .delete(verifyToken, staffController.deleteStaffFromEvent);

router.route('/:eventId/guests/:guestId')
  .get(verifyToken, guestController.getGuestInfo)
  .put(verifyToken, guestController.updateGuest);

router.route('/categories')
  .get(eventController.getAllCategories);

export default router;
