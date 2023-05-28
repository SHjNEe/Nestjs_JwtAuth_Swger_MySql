import { Column } from 'typeorm';

export const ColumnSmallInt = (required = false, unsigned = false) => Column({
  type: 'mediumint',
  unsigned,
  nullable: !required,
});
