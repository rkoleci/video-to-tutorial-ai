import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RabbitMqService } from './rabbitmq.service';

@Controller('rabbitmq')
export class RabbitMqkController {
  constructor(private readonly rmqService: RabbitMqService) {}

//   @Get()
//   getAllTasks(): Promise<void> {
//     return this.rmqService.getAllTasks();
//   }

  @Post()
  createTask(@Body('title') title: string): Promise<void> {
    return this.rmqService.sendMessage(title);
  }
 
}