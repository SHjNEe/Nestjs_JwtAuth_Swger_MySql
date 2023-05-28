// import * as _ from 'lodash';

export const PaginationMiddleware = (options: {
  maxSize?: number,
  defaultSize?: number,
  defaultSort?: { field: string, order: 'ASC' | 'DESC' },
  filterKeys?: string[],
  sortKeys?: string[],
} = {}) => (req, res, next) => {
  // const defaultOptions = { maxSize: 100, defaultSize: 10, filterKeys: [] };
  // const { maxSize, defaultSize, defaultSort, filterKeys, sortKeys } = Object.assign(defaultOptions, options);
  const pagination: any = {};
  // pagination.limit = Math.min(Math.max(1, _.get(req, 'query.size', defaultSize)), maxSize);
  // const page = Math.max(1, _.get(req, 'query.page', 1));
  // pagination.offset = pagination.limit * (page - 1);
  const { limit = 10, offset = 0, keyword } = req.query;

  pagination.limit = Number(limit);
  pagination.offset = Number(offset);

  if (keyword && typeof keyword === 'string') {
    pagination.keyword = keyword.trim();
  }
  // if (filterKeys) {
  //   if (filterKeys.length) {
  //     try {
  //       const filters = JSON.parse(req.query.filters);
  //       if (filters) {
  //         pagination.filters = _.pick(filters, filterKeys);
  //       }
  //     } catch (error) { }
  //   }
  // } else {
  try {
    const filters = JSON.parse(req.query.filters);
    pagination.filters = filters;
  } catch (error) {}
  // }
  // try {
  //   const sorts = JSON.parse(req.query.sorts);
  //   if (sorts.field && sorts.order && ['ASC', 'DESC'].includes(sorts.order)) {
  //     if (!sortKeys || (sortKeys.length && sortKeys.includes(sorts.field))) {
  //       pagination.sorts = sorts;
  //     }
  //   } else {
  //     pagination.sorts = defaultSort;
  //   }
  req.pagination = pagination;
  next();
  // } catch (error) {
  //   pagination.sorts = defaultSort;
  //   req.pagination = pagination;
  //   next();
  // }
};
