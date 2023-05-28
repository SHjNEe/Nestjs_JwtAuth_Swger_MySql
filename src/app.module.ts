import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import { ProfilesModule } from './components/profiles/profiles.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { AdminModule } from './components/admin/admin.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    TypeOrmModule.forRoot(ormconfig),
    ScheduleModule.forRoot(),
    UsersModule,
    ProfilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
