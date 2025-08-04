import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMqService } from './rabbitmq.service';
import { RabbitMqkController } from './rabbitmq.controller';

@Module({
  imports: [ ],
  providers: [RabbitMqService],
  controllers: [RabbitMqkController],
})
export class RabbitMqModule {}