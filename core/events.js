import eventODM from 'db/odm/event.odm';
import pagination from 'utils/pagination';
import { PageNotFoundError } from 'common/error';

/**
 *
 * Return list of events that associate with an user
 * @param {String} userId
 * @param {Number} page
 * @returns {Array<Object>} list of Events
 */
async function findEventsByUser(userId, page) {
  const listEvents = await eventODM.findByUserId(userId);
  const totalPages = pagination.getTotalPages(listEvents);
  const currentPage = (!page) ? 1 : page;
  if (currentPage < 0 || currentPage > totalPages) {
    throw new PageNotFoundError();
  }
  const pagingObject = pagination.arrayPaginate(listEvents, currentPage);
  return {
    totalPages,
    currentPage,
    itemsPerPage: pagination.itemsPerPage,
    ...pagingObject,
  };
}


export default { findEventsByUser };
