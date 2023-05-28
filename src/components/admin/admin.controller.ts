import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { PaginationQuery, PaginationResponse } from 'src/common/dtos';
import { Pagination } from '../../common/decorators';
import { CreateNewBody, GetDataWithIdParams, } from './admin.dto';
import { AdminGuard } from 'src/common/guards/user';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) { }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Body() body: CreateNewBody, @Param() params: GetDataWithIdParams) {
    const { id } = params;
    return this.adminService.update(id, body);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Delete(':id')
  delete(@Param() params: GetDataWithIdParams) {
    const { id } = params;
    return this.adminService.delete(Number(id));
  }

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() body: CreateNewBody) {
    return this.adminService.createNew(body);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get()
  async adminGetList(@Param() pagination: PaginationQuery) {
    const [admins, count] = await this.adminService.getList(pagination);
    return new PaginationResponse<any>(admins, count);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get(':id')
  adminGetDetail(@Param() params: GetDataWithIdParams) {
    const { id } = params;
    return this.adminService.getDetail(Number(id));
  }
}
