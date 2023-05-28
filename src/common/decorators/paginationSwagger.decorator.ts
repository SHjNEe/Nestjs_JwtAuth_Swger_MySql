import { ApiQuery } from '@nestjs/swagger';

export const ApiPagination = () => (target, name, descriptor) => {
  ApiQuery({ name: 'offset', type: 'number' })(target, name, descriptor);
  ApiQuery({ name: 'limit', type: 'number' })(target, name, descriptor);
  ApiQuery({ name: 'keyword', type: 'string', required: false })(target, name, descriptor);
  ApiQuery({ name: 'filters', type: 'json', required: false })(target, name, descriptor);
  // ApiQuery({ name: 'sorts', type: 'object', required: false })(target, name, descriptor);
};
