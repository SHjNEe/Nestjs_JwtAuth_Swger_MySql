import { Column } from 'typeorm';

export const ColumnFullName = (required = false) => Column({
  type: 'varchar',
  length: 100,
  nullable: !required,
});
