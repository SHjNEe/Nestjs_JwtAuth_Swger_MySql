import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ERROR_CODES, JWT_CONSTANT } from '../../constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANT.SECRET,
    });
  }

  async validate(payload: any) {
    const userDB = await this.userRepository.findOne({
      where: {
        id: +payload.sub
      }
    })

    if (!userDB.refresh_token || userDB.refresh_token !== payload.refreshToken) {
      throw new UnauthorizedException({
        message: ERROR_CODES.UNAUTHORIZED,
        statusCode: 401,
        error: ERROR_CODES.UNAUTHORIZED,
        login: false
      })
    }
    return { userId: payload.sub, email: payload.email, kind: payload.kind };
  }
}
