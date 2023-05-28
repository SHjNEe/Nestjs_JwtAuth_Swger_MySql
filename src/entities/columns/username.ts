import { Column } from 'typeorm';

export const ColumnUsername = (required = false) => Column({
  type: 'varchar',
  length: 50,
  nullable: !required,
});
