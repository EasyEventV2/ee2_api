import { SelectField } from 'common/constant';
import Event from 'db/models/Event';
import Group from 'db/models/Group';

/**
 *
 * @param {String} userId
 */
async function findByUserId(userId) {
  const listEvents = await Group.find(
    { users: userId },
    { _id: SelectField.NO }, // This is Group'id, that will not be returned.
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
