import eventCore from 'core/events';

const getEventsByUserId = async (req, res, next) => {
  try {
    const dataResponse = await eventCore.findEventsByUser(req.params.userId);
    res.json({
      data: dataResponse,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getEventsByUserId,
};
