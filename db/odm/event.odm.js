import constant from 'common/constant';
import Event from 'db/models/Event';
import Group from 'db/models/Group';

const { SelectField } = constant;

/**
 *
 * @param {String} userId
 */
async function findByUserId(userId, offset, limit) {
  const listEvents = await Group.find(
    { users: userId },
    { _id: SelectField.NO }, // This is Group'id, that will not be returned.
  ).populate('event', '_id name start_time end_time').skip(offset).limit(limit);
  return listEvents;
}

/**
 *
 * @param {String} userId
 */
async function countByUserId(userId) {
  const totalEvents = await Group.countDocuments({ users: userId });
  return totalEvents;
}

/**
 * Get all events that theirs end_time are greater than current time (not ended yet)
 */
async function findAll() {
  const currentTime = Date.now();
  const listEvents = await Event.find(
    { end_time: { $gte: currentTime } },
  );
  return listEvents;
}

/**
 * Find an event that matches given ID
 * @param {String} id
 * @returns {Object} event
 */
async function findById(id) {
  const event = await Event.findOne(
    { _id: id },
  );
  return event;
}

export default {
  findByUserId,
  countByUserId,
  findAll,
  findById,
};
