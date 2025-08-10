import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMqService } from './rabbitmq.service';
import { RabbitMqkController } from './rabbitmq.controller';
import { QueueService } from './queue.service';

@Module({
  imports: [ ],
  providers: [RabbitMqService, QueueService],
  controllers: [RabbitMqkController],
  exports: [ QueueService, RabbitMqService]
})
export class RabbitMqModule {}