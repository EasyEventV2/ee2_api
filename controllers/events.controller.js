import asyncDec from 'utils/asyncDecoration';
import eventCore from 'core/events.core';

const getEventsByUserId = asyncDec(async (req, res) => {
  const dataResponse = await eventCore.findEventsByUser(req.params.userId, req.query.p);
  res.json({
    data: dataResponse,
  });
});

const getEventInfo = asyncDec(async (req, res) => {
  const dataResponse = await eventCore.findEventDetails(req.params.eventId);
  res.json({
    data: dataResponse,
  });
});

const getAllEvents = asyncDec(async (req, res) => {
  const dataResponse = await eventCore.findAllEvents(req.query.p);
  res.json({
    data: dataResponse,
  });
});

const getAllCategories = asyncDec(async (req, res) => {
  const dataResponse = await eventCore.findAllCategories();
  res.json({
    data: dataResponse,
  });
});

const createEvent = asyncDec(async (req, res) => {
  const dataResponse = await eventCore.saveNewEvent(req.uid, req.body);
  res.json({
    data: dataResponse,
  });
});

export default {
  getEventsByUserId,
  getEventInfo,
  getAllEvents,
  getAllCategories,
  createEvent,
};
