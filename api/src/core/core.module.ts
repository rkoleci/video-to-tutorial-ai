import { Module } from '@nestjs/common';
import YoutubeService from './youtube.service';
import SpeechToTextService from './speechToText.service';
import { AIModule } from 'src/ai/ai.module';
import SummarizeService from './summarize.service';
import { CoreController } from './core.controller';
import AIService from 'src/ai/ai.service';

@Module({
  imports: [ AIModule],
  providers: [AIService,  YoutubeService,SpeechToTextService, SummarizeService],
  controllers: [CoreController],
})
export class CoreModule {}