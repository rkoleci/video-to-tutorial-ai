import { Module } from '@nestjs/common';
import AIService from './ai.service';
import { AiController } from './ai.controller';

@Module({
  imports: [ ],
  providers: [AIService],
  controllers: [AiController],
})
export class AIModule {}