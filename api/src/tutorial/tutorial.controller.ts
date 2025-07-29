import { Controller, Get, Post, Body } from '@nestjs/common';
import TutorialService from './tutorial.service';
import { Tutorial } from './tutorial.entity';

@Controller('tutorials')
export default class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @Get()
  async findAll(): Promise<Tutorial[]> {
    return this.tutorialService.findAll();
  }

  @Post()
  async create(@Body() tutorial: Tutorial): Promise<Tutorial> {
    return this.tutorialService.create(tutorial);
  }
}