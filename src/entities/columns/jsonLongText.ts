import { Column } from 'typeorm';
import { JsonText } from '../valueTransformers';

export const ColumnJsonLongText = (required = false) => Column({
  type: 'longtext',
  nullable: !required,
  transformer: JsonText,
});
