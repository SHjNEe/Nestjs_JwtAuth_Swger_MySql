import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationMiddleware } from 'src/common/middlewares';
import { Profile, User } from "../../entities";
import { AdminService } from '../admin/admin.service';
import { AuthService } from '../auth/auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfilesService } from "../profiles/profiles.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Profile])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService, AdminService, ProfilesService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware())
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
      );
  }
}
