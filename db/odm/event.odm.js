/* eslint-disable no-unused-vars */
import Event from 'db/models/Event';
import Group from 'db/models/Group';

/**
 *
 * @param {String} userId
 */
async function findByUserId(userId) {
  const listEvents = await Group.find(
    { users: userId },
  ).populate('event').select('event');
  return listEvents;
}

export default {
  findByUserId,
};
