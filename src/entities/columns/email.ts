import { Column } from 'typeorm';

export const ColumnEmail = (required = true) =>
  Column({
    type: 'varchar',
    length: 150,
    nullable: required,
  });
