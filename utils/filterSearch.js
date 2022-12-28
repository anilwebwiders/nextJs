const filterSearch = ({ router, search, type, sort, page }) => {
  const path = router.pathname;
  const query = router.query;

  if (search) query.search = search;
  if (type) query.type = type;
  if (sort) query.sort = search;
  if (page) query.page = page;

  router.push({
    pathname: path,
    query: query,
  })
};

export default filterSearch;
