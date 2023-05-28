import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  Put,
  UseInterceptors, UploadedFile, Res
} from "@nestjs/common";
import { ProfilesService } from './profiles.service';
import { CreateProfileDto, GetDataWithIdParams } from './create-profile.dto';
import { UpdateProfileDto } from './update-profile.dto';
import { PaginationQuery, PaginationResponse } from "../../common/dtos";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AdminGuard, UserSignedGuard } from "../../common/guards/user";
import { RequestWithUser } from "../../common/interfaces";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadImage } from "../../common/validatorContraints/imageStorage";
import { validateImage } from "../../common/validatorContraints/validateImage";

@ApiTags('profiles')
@Controller('api/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  async create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(UserSignedGuard)
  async findAll(@Query() pagination: PaginationQuery) {
    const [profile, count] = await this.profilesService.findAll(pagination);
    return new PaginationResponse<any>(profile, count);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(UserSignedGuard)
  async findOne(@Param() params: GetDataWithIdParams) {
    const { id } = params;
    return this.profilesService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(UserSignedGuard)
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar', uploadImage('avatar')))
  async update(
    @Req() request: RequestWithUser,
    @Param() params: GetDataWithIdParams,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile(validateImage()) file: Express.Multer.File
  ) {
    const { id } = params;
    const authUser = request.user
    return this.profilesService.update(+id, updateProfileDto, authUser, file);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
