import { ValueTransformer } from 'typeorm';

export const JsonText: ValueTransformer = {
  from: (v: string): object => {
    if (v) {
      return JSON.parse(v);
    }
    return null;
  },
  to: (v: object) => {
    if (v) {
      return JSON.stringify(v);
    }
    return null;
  },
};
