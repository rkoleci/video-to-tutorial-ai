import { Controller, Get, Post, Body, Param, Put, UseGuards, Req } from '@nestjs/common';
import TutorialService from './tutorial.service';
import { StatusEnum, Tutorial } from './tutorial.entity';
import { Jwt } from 'src/auth/jwt.guard';

@Controller('tutorials')
@UseGuards(Jwt)
export default class TutorialController {
  constructor(private readonly tutorialService: TutorialService) { }


  @Get()
  async findAll(): Promise<Tutorial[]> {
    return this.tutorialService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Tutorial | undefined> {
    return this.tutorialService.findById(id);
  }

  // Client calls this to start the processs
  @Post()
  async create(@Body() tutorial: Partial<Tutorial>, @Req() req: any): Promise<Tutorial> {
    const user = req.user;
    console.log(111, 'POST', user)
    return this.tutorialService.create(tutorial, user?.id);
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

  @Post("/user")
  async findUserTutorials(@Req() req: any): Promise<Tutorial[]> {
    const userId = req.user.id;
    console.log(111, 'userId', userId)
    return this.tutorialService.findUserTutorials(userId);
  }
}
