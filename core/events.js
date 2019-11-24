/* eslint-disable no-unused-vars */
import { CastError } from 'mongoose';
import Event from 'db/models/Event';
import Group from 'db/models/Group';

/**
 *
 * Return list of events that associate with an user
 * @param {String} userId
 * @returns {Array<Object>} list of Events
 */
async function findEventsByUser(userId) {
  let data = {};
  const listEvents = await Group.find(
    { users: userId },
    { _id: 0 },
  ).populate('event').select('event');
  data = listEvents;
  return data;
}


export default { findEventsByUser };
