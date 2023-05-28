import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "../../entities/profile.entity";
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PaginationMiddleware } from 'src/common/middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfilesController],
  providers: [ProfilesService]
})
export class ProfilesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware())
      .forRoutes(
        { path: 'profiles', method: RequestMethod.GET },
      );
  }
}
