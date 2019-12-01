const itemsPerPage = 10;
/**
 *
 * @param {Array} arr
 * @param {Number} page
 */
function arrayPaginate(arr, page) {
  const startItem = (page - 1) * itemsPerPage;
  const endItem = page * itemsPerPage;
  const itemsList = arr.slice(startItem, endItem);
  return {
    totalItems: arr.length,
    showingFrom: startItem + 1,
    currentTotals: itemsList.length,
    itemsList,
  };
}

/**
 *
 * @param {Array} arr
 */
function getTotalPages(arr) {
  return Math.ceil(arr.length / itemsPerPage);
}

export default {
  arrayPaginate,
  getTotalPages,
  itemsPerPage,
};
