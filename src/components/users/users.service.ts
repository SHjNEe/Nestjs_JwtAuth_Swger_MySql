import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_CODES, ROLE_NAME } from 'src/constants';
import {
  Profile,
  selectedKeysProfile,
  selectedKeysUser,
  User,
} from '../../entities';
import { Brackets, IsNull, Repository } from 'typeorm';
import { MysqlError } from 'mysql';
import { CreateNewUser } from './users.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUsers } from './update-users.dto';
import { AuthService } from '../auth/auth.service';
import config from '../../config';
import { SUCCESS_CODES } from '../../constants/successCodes';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private profileService: ProfilesService,
    private authService: AuthService,
  ) {}

  public getListUser(pagination: any, authId: number) {
    try {
      const { offset = 0, limit = 10, keyword } = pagination;
      const query = this.usersRepository
        .createQueryBuilder('users')
        .orderBy('users.id', 'DESC')
        .leftJoinAndSelect('users.profile', 'profiles')
        .select([
          ...selectedKeysUser.map((x) => `users.${x}`),
          ...selectedKeysProfile.map((x) => `profiles.${x}`),
        ])
        .skip(offset)
        .take(limit);

      if (keyword) {
        query.andWhere(
          new Brackets((qr) => {
            qr.where('users.email LIKE :keyword', { keyword: `%${keyword}%` })
              .orWhere('profiles.first_name LIKE :keyword', {
                keyword: `%${keyword}%`,
              })
              .orWhere('profiles.last_name LIKE :keyword', {
                keyword: `%${keyword}%`,
              });
          }),
        );
      }

      return query.getManyAndCount();
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  public async delete(id: number, authId: number) {
    const users = await this.usersRepository.findOne({
      where: { id, deleted_at: IsNull() },
      relations: ['profile'],
    });
    if (id === authId) {
      throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
    }
    if (!users) {
      throw new NotFoundException(ERROR_CODES.USER_NOT_FOUND);
    }

    try {
      if (users.profile) {
        await this.profileService.remove(users.profile.id);
      }
      await this.usersRepository.softDelete(id);
      return { message: ERROR_CODES.DELETE_SUCCESSFULLY, id: users.id };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  private checkMysqlError(error: any) {
    const mysqlError = error as MysqlError;
    if (mysqlError.code === 'ER_DUP_ENTRY')
      throw new BadRequestException(mysqlError.sqlMessage);
    else throw new InternalServerErrorException(mysqlError.message);
  }

  public async updatePassword(
    id: number,
    requestPassword: string,
    authUser: { userId: string; email: string; kind: string },
  ) {
    try {
      if (
        authUser.kind === ROLE_NAME.ADMIN ||
        parseInt(authUser.userId) === id
      ) {
        const password: string = await bcrypt.hash(
          requestPassword,
          config.BCRYPT_SALT_ROUND,
        );
        await this.usersRepository.update(id, { password: password });
        return { message: SUCCESS_CODES.UPDATE_SUCCESSFULLY, id: id };
      }
      return { message: ERROR_CODES.UNAUTHORIZED };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  public async create(body: CreateNewUser) {
    try {
      const hashPassword: string = await bcrypt.hash(body.password, 12);
      body = { ...body, password: hashPassword };
      const userInfo: { email; password; active; role } = body;
      const userCreate: User = await this.usersRepository.save({
        ...userInfo,
        active: true,
      });
      const profileInfo = { ...body, user: userCreate.id };
      const {
        first_name,
        last_name,
        phone,
        birth_of_date,
        date_of_joining,
        address,
        gender,
        user,
      } = profileInfo;

      const profile: Profile = await this.profileService.create({
        first_name,
        last_name,
        phone,
        birth_of_date,
        date_of_joining,
        address,
        gender,
        user,
      });

      // Create refresh token
      await this.usersRepository.update(+userCreate.id, {
        refresh_token: this.authService.createRefreshToken(userCreate),
        profile,
      });
      return { message: ERROR_CODES.CREATE_SUCCESSFULLY, data: userCreate };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  public async update(
    id: number,
    body: UpdateUsers,
    authUser: { userId: string; email: string; kind: string },
  ) {
    try {
      if (
        authUser.kind === ROLE_NAME.ADMIN ||
        parseInt(authUser.userId) === id
      ) {
        const user: any = await this.usersRepository.findOne({
          where: { id },
          relations: {
            profile: true,
          },
        });
        let { email, active, role, password, confirm_password, ...restBody } =
          body;
        let userUpdate = { email, active, role, password };
        if (password) {
          const passwordHash: string = !!body.password.length
            ? await bcrypt.hash(password, +config.BCRYPT_SALT_ROUND)
            : user.password;
          userUpdate = { ...userUpdate, password: passwordHash };
        }
        await this.usersRepository.update(id, userUpdate);
        const profileId = user?.profile?.id;
        if (profileId) {
          await this.profileRepository.update(profileId, restBody);
        }
        return { message: SUCCESS_CODES.UPDATE_SUCCESSFULLY, data: userUpdate };
      }
      return { message: ERROR_CODES.UNAUTHORIZED };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }
}
