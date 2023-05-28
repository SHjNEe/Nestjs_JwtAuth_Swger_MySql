import { Column } from 'typeorm';

export const ColumnTeamId = () => Column({
  unsigned: true,
  nullable: true,
});
