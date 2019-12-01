import asyncDec from 'utils/asyncDecorator';
import eventCore from 'core/events';

const getEventsByUserId = asyncDec(async (req, res) => {
  const dataResponse = await eventCore.findEventsByUser(req.params.userId, req.query.p);
  res.json({
    data: dataResponse,
  });
});

export default {
  getEventsByUserId,
};
