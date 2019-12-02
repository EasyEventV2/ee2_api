import { PageNotFoundError } from 'common/error';

/**
 *
 * @param {Number} totalItems
 * @param {Number} itemsPerPage
 * @param {Object} page
 */
function getPaginatedObject(totalItems, itemsPerPage, page) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = (!page) ? 1 : parseInt(page, 10);
  if (!currentPage // parsing Error
    || (currentPage && (currentPage < 0 || currentPage > totalPages))) {
    throw new PageNotFoundError({
      data: {
        totalPages,
      },
    });
  }
  const offset = (currentPage - 1) * itemsPerPage;
  const limit = itemsPerPage;
  return {
    totalPages,
    currentPage,
    itemsPerPage,
    totalItems,
    offset,
    limit,
  };
}

export default {
  getPaginatedObject,
};
