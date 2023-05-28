import { Column } from 'typeorm';

export const ColumnLongText = () => Column({
  type: 'longtext',
  nullable: true,
});
