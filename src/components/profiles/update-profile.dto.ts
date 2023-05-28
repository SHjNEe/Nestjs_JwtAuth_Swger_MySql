import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProfileDto } from './create-profile.dto';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  gender: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Tester' })
  first_name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Tester' })
  last_name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '0987654321' })
  phone: string

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  user_id: number

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: "2016-10-14" })
  birth_of_date: Date

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: "2016-10-14" })
  date_of_joining: Date

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Testersoft" })
  address: string

  @IsOptional()
  @ApiProperty({type:"file", format:"binary"})
  avatar: string
}
