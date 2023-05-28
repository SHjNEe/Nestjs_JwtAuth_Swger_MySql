import { Column } from 'typeorm';

export const ColumnDate = () => Column({
  type: 'date',
  nullable: true,
});
