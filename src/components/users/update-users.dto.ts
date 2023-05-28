import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsIn,
  IsEmail,
  IsBoolean,
  MinLength,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNewUser } from './users.dto';
import { Match } from 'src/common/decorators/match.decorator';
import { IsMinLengthCustom } from '../../common/validatorContraints/IsMinLengthCustom';

export class UpdateUsers extends CreateNewUser {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'admin@testersoft.com' })
  email: string;

  @Validate(IsMinLengthCustom)
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'tester@12345' })
  password: string;

  @Validate(IsMinLengthCustom)
  @IsString()
  @IsOptional()
  @Match('password')
  @ApiProperty({ example: 'tester@12345' })
  confirm_password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  active: boolean;

  @IsOptional()
  @IsNumber()
  @IsIn([1, 2])
  @ApiProperty({ example: 1 })
  role: number;
}
