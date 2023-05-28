import { Column } from 'typeorm';

export const ColumnInt = (required = false) => Column({
  type: 'int',
  nullable: !required,
});
