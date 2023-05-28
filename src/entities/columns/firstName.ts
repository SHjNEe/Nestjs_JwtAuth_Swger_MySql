import { Column } from 'typeorm';

export const ColumnFirstName = () => Column({
  type: 'varchar',
  length: 255,
  nullable: true,
});
