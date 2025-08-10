import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import TutorialService from './tutorial.service';
import { StatusEnum, Tutorial } from './tutorial.entity';

@Controller('tutorials')
export default class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @Get()
  async findAll(): Promise<Tutorial[]> {
    return this.tutorialService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Tutorial | undefined> {
    return this.tutorialService.findById(id);
  }

  @Post()
  async create(@Body() tutorial: Tutorial): Promise<Tutorial> {
    return this.tutorialService.create(tutorial);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() partialTutorial: Partial<Tutorial>,
  ): Promise<Tutorial> {
    return this.tutorialService.update(id, partialTutorial);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: StatusEnum,
  ): Promise<Tutorial> {
    return this.tutorialService.updateStatus(id, status);
  }
}
