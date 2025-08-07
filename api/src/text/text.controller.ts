import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import ExtractionService from './text.service';

@Controller('text')
export class TextController {
  constructor(private readonly service: ExtractionService) {}

  @Post( )
  async download(@Body() body: any): Promise<string> {
    console.log(111, body)
    return this.service.getText()
  } 
}
