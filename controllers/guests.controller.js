import asyncDec from 'utils/asyncDecoration';
import guestCore from 'core/guests.core';

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
  const dataResponse = await guestCore.updateGuest(req.params.guestId, req.body.action);
  res.json({
    data: dataResponse,
  });
}));

const verifyQR = (asyncDec(async (req, res) => {
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
  verifyQR,
};
