import { Column } from 'typeorm';

export const ColumnName = () => Column({
  type: 'varchar',
  length: 255,
  nullable: true,
});
