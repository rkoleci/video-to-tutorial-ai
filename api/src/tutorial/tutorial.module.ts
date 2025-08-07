import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutorial } from './tutorial.entity';
import TutorialService from './tutorial.service';
import TutorialController from './tutorial.controller';
import { MyRedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tutorial]), MyRedisModule ],
  providers: [TutorialService],
  controllers: [TutorialController],
})
export class TutorialModule {}