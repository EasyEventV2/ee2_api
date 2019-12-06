import eventODM from 'db/odm/event.odm';
import pagination from 'utils/pagination';
import constant from 'common/constant';

const { ItemsPerPage } = constant;

/**
 *
 * Return list of events that associate with an user (pagination)
 * @param {String} userId
 * @param {Number} page
 * @returns {Object} pagination info with list of Events
 */
async function findEventsByUser(userId, page) {
  const totalEvents = await eventODM.countByUserId(userId);
  const paginatedObject = pagination
    .getPaginatedObject(totalEvents, ItemsPerPage.USER_EVENTS_LIST, page);
  const { offset, limit, ...paginationInfo } = paginatedObject;
  const listEvents = await eventODM.findByUserId(userId, offset, limit);
  return {
    ...paginationInfo,
    itemsList: listEvents,
  };
}

/**
 *
 * @param {String} eventId
 */
async function findEventDetails(eventId) {
  const event = await eventODM.findById(eventId);
  if (!event) {
    throw Error('Not Found Event');
  }
  return event;
}

export default {
  findEventsByUser,
  findEventDetails,
};
