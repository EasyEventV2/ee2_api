function getPaginatedObject(totalItems, itemsPerPage, page) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = (!page) ? 1 : parseInt(page, 10);
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
