import { Column } from 'typeorm';

export const ColumnCustomerId = () => Column({
  unsigned: true,
  nullable: true,
});
