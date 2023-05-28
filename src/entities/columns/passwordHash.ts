import { Column } from 'typeorm';

export const ColumnPasswordHash = (canEmpty = false) => Column({
  type: 'varchar',
  length: 100,
  nullable: canEmpty,
});
