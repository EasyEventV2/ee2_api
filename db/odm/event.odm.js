/* eslint-disable no-unused-vars */
import Event from 'db/models/Event';
import Group from 'db/models/Group';

const SELECT_FIELD = {
  YES: 1,
  NO: 0,
};

/**
 *
 * @param {String} userId
 */
async function findByUserId(userId) {
  const listEvents = await Group.find(
    { users: userId },
    { _id: SELECT_FIELD.NO }, // This is Group'id, that will not be returned.
  ).populate('event');
  return listEvents;
}

/**
 *
 */
async function findAll() {
  const currentTime = new Date();
  const listEvents = await Event.find(
    { end_time: { $gte: currentTime } },
  );
  return listEvents;
}

export default {
  findByUserId,
  findAll,
};
