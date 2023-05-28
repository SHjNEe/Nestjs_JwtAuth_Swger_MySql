import { Column } from 'typeorm';

export const ColumnBoolean = () => Column({
  type: 'bool',
  nullable: true,
});
