import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsNumber,
  IsIn,
  IsEmail,
  IsBoolean,
  IsDateString,
  Validate,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../../common/decorators/match.decorator';
import {
  IsDateLessThanNow,
  IsNotNumberIsSpecial,
  CheckDateOfJoining,
} from 'src/common/validatorContraints';
import { MIN_CHARACTER } from 'src/constants';

export class GetDataWithIdParams {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: 1 })
  id: number;
}

export class CreateNewUser {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'admin@tester.com' })
  email: string;

  @MinLength(MIN_CHARACTER)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Tester@12345' })
  password: string;

  @IsString()
  @Match('password')
  @IsNotEmpty()
  @ApiProperty({ example: 'Tester@12345' })
  confirm_password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([1, 2])
  @ApiProperty({ example: 1 })
  role: number;

  @Validate(IsNotNumberIsSpecial)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Tester' })
  first_name: string;

  @Validate(IsNotNumberIsSpecial)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Tester' })
  last_name: string;

  @IsString()
  @IsPhoneNumber('VN')
  @IsOptional()
  @ApiProperty({ example: '0987654321' })
  phone: string;

  @Validate(IsDateLessThanNow)
  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: '2016-10-14' })
  birth_of_date: Date;

  @Validate(CheckDateOfJoining)
  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: '2016-10-14' })
  date_of_joining: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Tester' })
  address: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  gender: boolean;
}
