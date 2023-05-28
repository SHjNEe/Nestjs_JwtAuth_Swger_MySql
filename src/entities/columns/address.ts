import { Column } from 'typeorm';

export const ColumnAddress = () => Column({
  type: 'varchar',
  length: 300,
  nullable: true,
});
