import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PaginationMiddleware } from '../../common/middlewares';
import { User } from '../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware())
      .forRoutes(
        { path: 'admin', method: RequestMethod.GET },
      );
  }
}
