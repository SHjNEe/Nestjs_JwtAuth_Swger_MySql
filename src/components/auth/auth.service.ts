import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { AuthLoginBody, AuthRefreshBody } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { ERROR_CODES, ROLE, ROLE_NAME, USER_STATUS } from 'src/constants';
import { SUCCESS_CODES } from 'src/constants/successCodes';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { User } from 'src/entities';
import config from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(
    user: AuthLoginBody,
  ): Promise<{ accessToken: string; refreshToken: string; message: string }> {
    const { email, password, isRemember } = user;
    const userDB = await this.adminService.findUser(email);

    if (!(await bcrypt.compare(password, userDB.password))) {
      throw new BadRequestException(ERROR_CODES.INVALID_PASSWORD);
    }

    const kind = this.getRoleNameUser(userDB.role);
    const refreshToken = this.createRefreshToken(userDB);
    await this.userRepository.update(userDB.id, {
      refresh_token: refreshToken,
    });
    let accessToken = this.createPayload({
      email,
      kind,
      sub: userDB.id,
      refreshToken,
    });

    if (isRemember) {
      accessToken = this.createAccessToken(
        userDB,
        refreshToken,
        config.JWT_TOKEN_REMEMBER_EXPIRES,
      );
    }

    return {
      accessToken,
      refreshToken,
      message: SUCCESS_CODES.LOGIN_SUCCESS,
    };
  }

  async logout(auth: any): Promise<{ message: string }> {
    const author = auth.authorization;
    const token = this.getTokenFromHeader(author);
    const decodeToken = this.jwtService.decode(token);
    if (typeof decodeToken === 'string') {
      return {
        message: ERROR_CODES.UNAUTHORIZED,
      };
    }

    await this.userRepository.update(+decodeToken.sub, {
      refresh_token: null,
    });

    return {
      message: SUCCESS_CODES.LOGOUT_SUCCESS,
    };
  }

  async refreshToken(
    token: AuthRefreshBody,
  ): Promise<{ accessToken: string; refreshToken: string } | any> {
    const decodeToken = this.jwtService.decode(token.refresh_token);
    if (typeof decodeToken === 'string' || !decodeToken) {
      return {
        message: ERROR_CODES.UNAUTHORIZED,
      };
    }

    const user: User = await this.userRepository.findOne({
      where: {
        id: +decodeToken.sub,
        deleted_at: IsNull(),
      },
    });

    if (token.refresh_token !== user.refresh_token) {
      return {
        message: ERROR_CODES.UNAUTHORIZED,
      };
    }

    const refreshToken = this.createRefreshToken(user);
    await this.userRepository.update(+decodeToken.sub, {
      refresh_token: refreshToken,
    });

    return {
      accessToken: this.createAccessToken(user, refreshToken),
      refreshToken,
    };
  }

  private getToken(
    user: User,
    tokenType : any,
    expires: any,
    refreshToken = null,
  ): string {
    if (refreshToken) {
      return this.jwtService.sign(
        {
          email: user.email,
          kind: this.getRoleNameUser(user.role),
          sub: user.id,
          refreshToken,
        },
        {
          secret: tokenType,
          expiresIn: expires,
        },
      );
    }

    return this.jwtService.sign(
      {
        email: user.email,
        kind: this.getRoleNameUser(user.role),
        sub: user.id,
      },
      {
        secret: tokenType,
        expiresIn: expires,
      },
    );
  }

  public createRefreshToken(
    user: User,
    expires = config.JWT_REFRESH_TOKEN_EXPIRES,
  ) {
    return this.getToken(user, config.JWT_REFRESH_TOKEN, expires);
  }

  public createAccessToken(
    user: User,
    refreshToken: string,
    expires = config.JWT_TOKEN_EXPIRES,
  ) {
    return this.getToken(user, config.JWT_SECRET, expires, refreshToken);
  }

  private getTokenFromHeader(token: string): string {
    return token.replace('Bearer ', '');
  }

  private createPayload(payload: {
    email: string;
    kind: string;
    sub: number;
    refreshToken: string;
  }): string {
    return this.jwtService.sign(payload);
  }

  public getRoleNameUser(roleUser: number): string {
    switch (roleUser) {
      case ROLE.ADMIN:
        return ROLE_NAME.ADMIN;
      case ROLE.USER:
        return ROLE_NAME.USER;
      default:
        return '';
    }
  }
}
