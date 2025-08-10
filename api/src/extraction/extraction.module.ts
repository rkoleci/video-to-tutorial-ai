import { Module } from '@nestjs/common';
import ExtractionService from './extraction.service';
import { ExtractionController } from './extraction.controller';
import { PuppeteerYoutubeSubtitlesService } from './pupeeter.service';
import { RabbitMqModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMqModule ],
  providers: [ExtractionService, PuppeteerYoutubeSubtitlesService],
  controllers: [ExtractionController],
})
export class ExtractionModule {}