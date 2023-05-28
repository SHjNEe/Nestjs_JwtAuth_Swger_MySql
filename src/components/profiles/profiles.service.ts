import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UpdateProfileDto } from "./update-profile.dto";
import { Brackets, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile, selectedKeysProfile, selectedKeysUser } from "../../entities";
import { MysqlError } from "mysql";
import { SUCCESS_CODES } from "../../constants/successCodes";
import { ERROR_CODES, ROLE_NAME } from "../../constants";
import { removeFile } from "../../common/validatorContraints/imageStorage";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {  }
  public async create(createProfileDto: any) {
    return await this.profileRepository.save(createProfileDto);
  }

  findAll(pagination: any) {
    try {
      const { offset = 0, limit = 10, keyword } = pagination;
      const query = this.profileRepository.createQueryBuilder('profiles')
        .leftJoinAndSelect("profiles.user_id", "users")
        .select([
          ... selectedKeysUser.map(x => `users.${x}`),
          ... selectedKeysProfile.map(x => `profiles.${x}`)
        ])
        .skip(offset)
        .take(limit);
      if (keyword) {
        query.andWhere(new Brackets(qb => {
          qb.where('profiles.first_name LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('profiles.last_name LIKE :keyword', { keyword: `%${keyword}%` })
        }));
      }
      return query.getManyAndCount();
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  public async findOne(id: number) {
    try {
      return await this.profileRepository.createQueryBuilder('profiles')
        .leftJoinAndSelect("profiles.user_id", "users")
        .select([
          ...selectedKeysUser.map(x => `users.${x}`),
          ...selectedKeysProfile.map(x => `profiles.${x}`)
        ]).where('profiles.id', { id }).getOne();
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  public async update(id: number, updateProfileDto: UpdateProfileDto, authUser, file: Express.Multer.File) {
    try {
      if (authUser.kind === ROLE_NAME.ADMIN || parseInt(authUser.userId) === id) {
        if (file?.originalname) {
          const path = file.path.split('/')
          path.shift()
          updateProfileDto.avatar = path.join('/')
        }
        // @ts-ignore
        await this.profileRepository.update(id, updateProfileDto)
        return { message: SUCCESS_CODES.UPDATE_SUCCESSFULLY, id: id };
      }
      return { message: ERROR_CODES.UNAUTHORIZED };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  public async remove(id: number) {
    try {
      const profile = await this.profileRepository.findOne({ where: { id } })
      if (!!profile.avatar) removeFile('public/' + profile.avatar);
      this.profileRepository.softDelete(profile.id)
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  private checkMysqlError(error: any)
  {
    const mysqlError = error as MysqlError;
    if (mysqlError.code === 'ER_DUP_ENTRY') throw new BadRequestException(mysqlError.sqlMessage);
    else throw new InternalServerErrorException(mysqlError.message);
  }
}
