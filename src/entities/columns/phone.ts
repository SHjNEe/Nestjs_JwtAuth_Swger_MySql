import { Column } from 'typeorm';

export const ColumnPhone = () =>
  Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  });
