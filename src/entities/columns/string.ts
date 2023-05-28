import { Column } from 'typeorm';

export const ColumnString = (required = false) => Column({
  type: 'varchar',
  length: 255,
  nullable: !required,
});
