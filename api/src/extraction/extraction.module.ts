import { Module } from '@nestjs/common';
import ExtractionService from './extraction.service';
import { ExtractionController } from './extraction.controller';
import { PuppeteerYoutubeSubtitlesService } from './pupeeter.service';
import { RabbitMqModule } from 'src/rabbitmq/rabbitmq.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import AIService from 'src/ai/ai.service';

@Module({
  imports: [RabbitMqModule,AuthModule ],
  providers: [ExtractionService, PuppeteerYoutubeSubtitlesService, AIService],
  controllers: [ExtractionController],
})
export class ExtractionModule {}