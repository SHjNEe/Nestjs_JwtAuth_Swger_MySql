import { Column } from 'typeorm';

export const ColumnCode = () => Column({
  type: 'varchar',
  length: 30,
  nullable: true,
});
