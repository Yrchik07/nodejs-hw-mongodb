export const parseFiltersType = (unknown) => {
    if (typeof unknown !== 'string') return;
    return unknown;
  };

const parseBoolean = (unknown) => {
    if (!['true', 'false'].includes(unknown)) return;
    return unknown === 'true' ? true : false;
  };


export const parseFilters = (query) => {
  return {
    type: parseFiltersType(query.type),
    isFavourite: parseBoolean(query.isFavourite),
  };
};
