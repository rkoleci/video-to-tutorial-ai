import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import ExtractionService from './text.service';
import { Jwt } from 'src/auth/jwt.guard';

@Controller('text')
  @UseGuards(Jwt)
export class TextController {
  constructor(private readonly service: ExtractionService) {}

  @Post( )
  async download(@Body() body: any): Promise<string> {
    console.log(111, body)
    return this.service.getText()
  } 
}
