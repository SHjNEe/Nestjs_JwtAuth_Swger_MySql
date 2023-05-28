import { createParamDecorator } from '@nestjs/common';

export const Pagination = createParamDecorator((data: string, req) => {
  return data ? req.pagination && req.pagination[data] : req.pagination;
});
