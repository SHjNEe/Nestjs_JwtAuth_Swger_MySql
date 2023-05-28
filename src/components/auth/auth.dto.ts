import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AuthLoginBody {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'admin@tester.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '12345678' })
  password: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1 })
  isRemember: number;
}

export class AuthRefreshBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'abc' })
  refresh_token: string;
}
