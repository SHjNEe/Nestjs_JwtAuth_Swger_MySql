import { Column } from 'typeorm';
import { Month } from '../valueTransformers/month';

export const ColumnMonth = () => Column({
  type: 'smallint',
  transformer: Month,
  nullable: true,
});
