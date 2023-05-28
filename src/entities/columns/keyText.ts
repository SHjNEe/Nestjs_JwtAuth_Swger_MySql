import { Column } from 'typeorm';

export const ColumnKeyText = () => Column({
  length: 10,
  type: 'varchar',
  nullable: true,
});
