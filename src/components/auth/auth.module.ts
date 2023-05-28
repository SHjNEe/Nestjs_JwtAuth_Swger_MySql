import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT, JWT_TOKEN_EXPIRES } from '../../constants';
import { JwtStrategy } from './jwt.stratrgy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { AdminService } from '../admin/admin.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_CONSTANT.SECRET,
      signOptions: { expiresIn: JWT_TOKEN_EXPIRES },
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, JwtStrategy, AdminService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
