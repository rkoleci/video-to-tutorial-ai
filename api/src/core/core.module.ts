import { Module } from '@nestjs/common';
import YoutubeService from './youtube.service';
import SpeechToTextService from './speechToText.service';
import { AIModule } from 'src/ai/ai.module';
import SummarizeService from './summarize.service';

@Module({
  imports: [ AIModule],
  providers: [YoutubeService,SpeechToTextService, SummarizeService],
  controllers: [],
})
export class CoreModule {}