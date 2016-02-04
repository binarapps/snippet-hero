export function buildUrl (perPage, page) {
  const offset = perPage*(page-1);
  return ('results=' + perPage + '&offset=' + offset);
}
