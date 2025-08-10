import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { RabbitMqService } from './rabbitmq.service';

export enum RabbitMQueueNames {
  Q_DOWNLOAD_VIDEO = 'Q_DOWNLOAD_VIDEO',
  Q_EXTRACT_AUDIO = 'Q_EXTRACT_AUDIO',
  Q_EXTRACT_SUBTITLES = 'Q_EXTRACT_SUBTITLES',
  Q_AUDIO_TO_TEXT = 'Q_AUDIO_TO_TEXT',
  Q_TEXT_TO_SUMMARIZE_AI = 'Q_TEXT_TO_SUMMARIZE_AI',
}

@Injectable()
export class QueueService  {
 
  constructor(private readonly rabbitMqService: RabbitMqService) {}

  async publishMessage(
    queue: RabbitMQueueNames,
    content: string,
  ): Promise<void> {
    console.log(111, queue, content)
    try {
      if (!content) {
        throw new Error('Content is missing');
      }
 
      this.rabbitMqService.publishMessage(queue, content);
    

    } catch (error) {
      console.error('❌ Failed to send message:', error);
    }
  }

 
}
