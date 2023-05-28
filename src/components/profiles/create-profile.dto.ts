import { IsNotEmpty, IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetDataWithIdParams {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: 1 })
  id: number;
}

export class CreateProfileDto {}
