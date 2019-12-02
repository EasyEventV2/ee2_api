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
  ).populate('event').skip(offset).limit(limit);
  return listEvents;
}

async function countByUserId(userId) {
  const totalEvents = await Group.countDocuments({ users: userId });
  return totalEvents;
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
  countByUserId,
  findAll,
};
