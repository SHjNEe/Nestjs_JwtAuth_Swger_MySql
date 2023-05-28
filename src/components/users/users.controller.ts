import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQuery, PaginationResponse } from 'src/common/dtos';
import { GetDataWithIdParams } from './users.dto';
import { UsersService } from './users.service';
import { CreateNewUser } from './users.dto';
import { UpdateUsers } from './update-users.dto';
import { AdminGuard, UserSignedGuard } from 'src/common/guards/user';
import { RequestWithUser } from 'src/common/interfaces/user';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @UseGuards(UserSignedGuard)
  @ApiImplicitQuery({
    name: 'keyword',
    required: false,
    type: String,
  })
  async userGetList(@Query() pagination: PaginationQuery, @Request() req: any) {
    const authId = req.user.userId;
    const [users, count] = await this.userService.getListUser(
      pagination,
      Number(authId),
    );
    return new PaginationResponse<any>(users, count);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Delete(':id')
  delete(@Param() params: GetDataWithIdParams, @Request() req) {
    const { id } = params;
    const authId = req.user.userId;
    return this.userService.delete(Number(id), Number(authId));
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get(':id')
  adminGetDetail(@Param() params: GetDataWithIdParams) {
    const { id } = params;
  }

  @ApiBearerAuth()
  @UseGuards(UserSignedGuard)
  @Put('update-password/:id')
  updatePassword(
    @Req() request: RequestWithUser,
    @Body() body: CreateNewUser,
    @Param() params: GetDataWithIdParams,
  ) {
    const { id } = params;
    const authUser = request.user;
    return this.userService.updatePassword(Number(id), body.password, authUser);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() body: CreateNewUser) {
    return this.userService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(UserSignedGuard)
  @Put(':id')
  update(
    @Req() request: RequestWithUser,
    @Body() body: UpdateUsers,
    @Param() params: GetDataWithIdParams,
  ) {
    const { id } = params;
    const authUser = request.user;
    return this.userService.update(id, body, authUser);
  }
}
