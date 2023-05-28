import { Column } from 'typeorm';

export const ColumnForeignKeyInt = (required = false) => Column({
  type: 'bigint',
  unsigned: true,
  nullable: !required,
});
