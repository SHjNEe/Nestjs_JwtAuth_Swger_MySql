import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MysqlError } from 'mysql';
import { ERROR_CODES, USER_STATUS } from '../../constants';
import { Brackets, IsNull, Repository } from 'typeorm';
import { PaginationQuery } from '../../common/dtos';
import { CreateNewBody } from './admin.dto';
import { User } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private adminRepository: Repository<User>,
  ) { }

  public getList(pagination: any) {
    const { offset = 0, limit = 10, keyword } = pagination;

    const query = this.adminRepository.createQueryBuilder('user')
      .where('user.deleted_at IS NULL')
      .orderBy('user.updated_at', 'DESC')
      .skip(offset)
      .take(limit);

    if (keyword) {
      query.andWhere(new Brackets(qb => {
        qb.where('user.name LIKE :keyword', { keyword: `%${keyword}%` })
          .orWhere('user.email LIKE :keyword', { keyword: `%${keyword}%` })
      }));
    }

    return query.getManyAndCount();
  }

  public async getDetail(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id, deleted_at: IsNull() } });
    if (!admin) {
      throw new BadRequestException(ERROR_CODES.ADMIN_NOT_FOUND);
    }
    return admin;
  }

  public async createNew(body: CreateNewBody) {
    const admin = this.adminRepository.create({ ...body });
    try {
      const result: User = await this.adminRepository.save(admin);
      return { message: ERROR_CODES.CREATE_SUCCESSFULLY, id: result.id };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  public async update(id: number, body: CreateNewBody) {
    const admin = await this.adminRepository.findOne({ where: { id, deleted_at: IsNull() } });
    if (!admin) {
      throw new BadRequestException(ERROR_CODES.ADMIN_NOT_FOUND);
    }

    try {
      const result: User = await this.adminRepository.save(this.adminRepository.create({
        ...admin,
        ...body,
      }));

      return { message: ERROR_CODES.UPDATE_SUCCESSFULLY, id: result.id };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  public async delete(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id, deleted_at: IsNull() } });
    if (!admin) {
      throw new BadRequestException(ERROR_CODES.ADMIN_NOT_FOUND);
    }

    try {
      admin.deleted_at = new Date();
      await this.adminRepository.save(admin);
      return { message: ERROR_CODES.DELETE_SUCCESSFULLY, id: admin.id };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  private checkMysqlError(error: any) {
    const mysqlError = error as MysqlError;
    if (mysqlError.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException(mysqlError.sqlMessage);
    }
    throw new InternalServerErrorException(mysqlError.message);
  }

  public async findUser(email: string): Promise<User> {
    const user = await this.adminRepository.findOne({
      where: {
        email,
        active: Boolean(USER_STATUS.ACTIVE),
        deleted_at: IsNull()
      }
    })

    if (!user) {
      throw new NotFoundException(ERROR_CODES.USER_NOT_FOUND)
    }

    return user;
  }
}
