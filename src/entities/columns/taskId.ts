import { Column } from 'typeorm';

export const ColumnTaskId = () => Column({
  unsigned: true,
  nullable: true,
});
