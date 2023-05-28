import { Column } from 'typeorm';

export const ColumnDataBlob = (required = false) => Column({
  type: 'longblob',
  nullable: !required,
});
