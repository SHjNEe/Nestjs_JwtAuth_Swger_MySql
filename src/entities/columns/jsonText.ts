import { Column } from 'typeorm';
import { JsonText } from '../valueTransformers';

export const ColumnJsonText = (required = false) => Column({
  type: 'text',
  nullable: !required,
  transformer: JsonText,
});
