import { ValueTransformer, FindOperator } from 'typeorm';

export const BigIntTime: ValueTransformer = {
  to: (v: Date | FindOperator<any>) => {
    if (v instanceof FindOperator) {
      return v;
    }
    if (v instanceof Date) {
      return v.getTime();
    }
  },
  from: (databaseValue: string): Date => {
    if (databaseValue) {
      return new Date(Number(databaseValue));
    }
  },
};
