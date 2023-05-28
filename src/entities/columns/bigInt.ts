import { Column } from 'typeorm';

export const ColumnBigInt = (required = false) => Column({
  type: 'bigint',
  nullable: !required,
});
