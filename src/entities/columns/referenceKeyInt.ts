import { Column } from 'typeorm';

export const ColumnReferenceKeyInt = (required = false) => Column({
  type: 'bigint',
  unsigned: true,
  nullable: !required,
});
