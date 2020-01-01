import asyncDec from 'utils/asyncDecoration';
import staffCore from 'core/staffs.core';

const getStaffsByEventId = (asyncDec(async (req, res) => {
  const dataResponse = await staffCore.findStaffsByEventId(req.params.eventId);
  res.json({
    data: dataResponse,
  });
}));

const addStaffToEvent = asyncDec(async (req, res) => {
  const dataResponse = await staffCore.addStaffToEvent(req.params.eventId, req.body.email);
  res.json({
    data: dataResponse,
  });
});

const deleteStaffFromEvent = asyncDec(async (req, res) => {
  const dataResponse = await staffCore.removeStaffFromEvent(req.params.eventId, req.params.staffId);
  res.json({
    data: dataResponse,
  });
});

export default {
  getStaffsByEventId,
  addStaffToEvent,
  deleteStaffFromEvent,
};
