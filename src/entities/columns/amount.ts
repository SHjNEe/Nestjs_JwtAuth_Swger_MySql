import { Column } from 'typeorm';

export const ColumnAmount = (required = false) => Column({
  type: 'int',
  unsigned: true,
  nullable: !required,
});
