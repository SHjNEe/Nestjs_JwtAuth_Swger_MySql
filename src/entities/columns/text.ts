import { Column } from 'typeorm';

export const ColumnText = (required = false) => Column({
  type: 'text',
  nullable: !required,
});
