import eventController from 'controllers/events.controller';
import guestController from 'controllers/guests.controller';
import { Router } from 'express';
import verifyToken from 'middlewares/verifyToken';

const router = Router();

router.route('/:eventId')
  .get(eventController.getEventInfo);

router.route('/:eventId/guests')
  .get(verifyToken, guestController.getGuestsByEventId)
  .post(guestController.createGuest); // TODO: implement mailgun service to send verify email here

router.route('/:eventId/guests/:guestId')
  .get(verifyToken, guestController.getGuestInfo)
  .put(verifyToken, guestController.updateGuest);
// TODO: implement mailgun service to send approved email or check qr here

export default router;
