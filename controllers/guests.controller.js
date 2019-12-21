import asyncDec from 'utils/asyncDecoration';
import guestCore from 'core/guests.core';
import constant from 'common/constant';
import { UnknownActionError } from 'common/error';

const { GuestAction } = constant;

const getGuestsByEventId = (asyncDec(async (req, res) => {
  const dataResponse = await guestCore.findGuestsByEventId(req.params.eventId, req.query.p);
  res.json({
    data: dataResponse,
  });
}));

const getGuestInfo = (asyncDec(async (req, res) => {
  const dataResponse = await guestCore.findGuestById(req.params.guestId);
  res.json({
    data: dataResponse,
  });
}));

const createGuest = (asyncDec(async (req, res) => {
  const dataResponse = await guestCore
    .saveNewGuestWithEventId(req.body.userId, req.params.eventId, req.body.guestInfo);
  res.json({
    data: dataResponse,
  });
}));

const updateGuest = (asyncDec(async (req, res) => {
  const { action, ticketCode } = req.body;
  const { guestId } = req.params;
  let dataResponse = {};
  switch (action) {
    case GuestAction.VERIFY:
      dataResponse = await guestCore.updateVerifyGuestEmail(guestId);
      break;
    case GuestAction.APPROVE:
      dataResponse = await guestCore.updateApproveGuest(guestId);
      break;
    case GuestAction.CHECK_IN:
      dataResponse = await guestCore.updateCheckinGuest(ticketCode);
      break;
    default: throw new UnknownActionError();
  }

  res.json({
    data: dataResponse,
  });
}));

const checkTicket = (asyncDec(async (req, res) => {
  const dataResponse = await guestCore.findGuestByCode(req.body.code);
  res.json({
    data: dataResponse,
  });
}));

export default {
  getGuestsByEventId,
  getGuestInfo,
  createGuest,
  updateGuest,
  checkTicket,
};
