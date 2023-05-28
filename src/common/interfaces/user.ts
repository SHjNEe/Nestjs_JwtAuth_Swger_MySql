
export interface IUser {
  userId: number;
  email: string;
  kind: string;
  // record: Customer & Admin & Expert;
}

export type RequestWithUser = Request & { user: { userId: string, email: string, kind: string } }
