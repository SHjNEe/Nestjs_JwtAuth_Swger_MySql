import { ValueTransformer, FindOperator } from 'typeorm';

export const Month: ValueTransformer = {
  from: (v: number): string => {
    const year = 1970 + Math.floor(v / 12);
    const yearStr = `${year}`;
    const month = v % 12 + 1;
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    return `${yearStr}-${monthStr}`;
  },
  to: (v: string | FindOperator<any>) => {
    if (v instanceof FindOperator) {
      return v;
    }
    const year = Number(v.substring(0, 4));
    const month = Number(v.substring(5, 7));
    return (year - 1970) * 12 + (month - 1);
  },
};
