import { Module } from '@nestjs/common';
import AIService from './ai.service';

@Module({
  imports: [ ],
  providers: [AIService],
  controllers: [],
})
export class AIModule {}