import { Module } from '@nestjs/common';
import { TextController } from './text.controller';
import TextService from './text.service';
import AIService from 'src/ai/ai.service';

@Module({
  imports: [ ],
  providers: [TextService, AIService],
  controllers: [TextController],
})
export class TextModule {}