import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { RabbitMqService } from './rabbitmq.service';
import { Jwt } from 'src/auth/jwt.guard';

@Controller('rabbitmq')
  @UseGuards(Jwt)
export class RabbitMqkController {
  constructor(private readonly rmqService: RabbitMqService) {}

  @Get(":queue")
  receiveMessages(@Param('queue')  q: string): Promise<void> {
    return this.rmqService.receiveMessage(q);
  }

  @Post()
  createTask(@Body('title') title: string): Promise<void> {
    return this.rmqService.sendMessage('title');
  }
 
}