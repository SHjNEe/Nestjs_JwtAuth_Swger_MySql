import { Column } from 'typeorm';

export const ColumnLongString = (required = false) => Column({
  type: 'varchar',
  length: 500,
  nullable: !required,
});
