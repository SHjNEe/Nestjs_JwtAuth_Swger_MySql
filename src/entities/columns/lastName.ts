import { Column } from 'typeorm';

export const ColumnLastName = () => Column({
  type: 'varchar',
  length: 255,
  nullable: true,
});
