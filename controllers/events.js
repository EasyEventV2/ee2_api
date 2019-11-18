import eventCore from '../core/events';

const getEventsByUserId = async (req, res) => {
  const dataResponse = await eventCore.findEventsByUser(req.params.userId);
  res.status(dataResponse.status).json(dataResponse.body);
};

export default {
  getEventsByUserId,
};
