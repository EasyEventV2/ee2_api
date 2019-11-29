import eventODM from 'db/odm/event.odm';

/**
 *
 * Return list of events that associate with an user
 * @param {String} userId
 * @returns {Array<Object>} list of Events
 */
async function findEventsByUser(userId) {
  const listEvents = await eventODM.findByUserId(userId);
  return listEvents;
}


export default { findEventsByUser };
