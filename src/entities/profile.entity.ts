import {
  Entity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  AfterUpdate
} from "typeorm";
import {
  ColumnString,
  ColumnText,
  ColumnBoolean,
  ColumnPhone, ColumnDate
} from "./columns";
import { User } from "./user.entity";

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @ColumnString()
  first_name: string

  @ColumnString()
  last_name: string

  @ColumnText()
  avatar: string

  @ColumnBoolean()
  gender: boolean

  @ColumnPhone()
  phone: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @ColumnDate()
  birth_of_date: Date;

  @ColumnDate()
  date_of_joining: Date;

  @ColumnString()
  address: string

  // Time
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export const selectedKeysProfile: Array<keyof Profile> = [
  'id',
  'first_name',
  'last_name',
  'avatar',
  'gender',
  'phone',
  'birth_of_date',
  'date_of_joining',
  'address',
  'user',
];
