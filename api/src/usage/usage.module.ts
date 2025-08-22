import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usage } from './usage.entity';
import { UsageService } from './usage.service';
import { IpLimitMiddleware } from './ip-limit';

@Module({
  imports: [TypeOrmModule.forFeature([Usage])],
  providers: [UsageService],
  controllers: [],
  exports: [UsageService]
})
export class UsageModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(IpLimitMiddleware)
        .forRoutes('*'); // apply globally, or pick specific routes
    }
  }



