import { Column } from 'typeorm';

export const ColumnTinyInt = (required = false) => Column({
  type: 'tinyint',
  nullable: !required,
});
