import { Column } from 'typeorm';
import { BigIntTime } from '../valueTransformers';

export const ColumnTime = () => Column({
  type: 'bigint',
  unsigned: true,
  nullable: true,
  transformer: BigIntTime,
});
