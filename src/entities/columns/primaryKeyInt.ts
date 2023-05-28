import { PrimaryGeneratedColumn } from 'typeorm';

export const ColumnPrimaryKeyInt = () => PrimaryGeneratedColumn({
  type: 'bigint',
  unsigned: true,
});
