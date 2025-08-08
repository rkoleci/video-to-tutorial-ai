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
import ExtractionService from './extraction.service';

@Controller('extraction')
export class ExtractionController {
  constructor(private readonly service: ExtractionService) {}

 @Post('extract')
  async extractAudio(@Body('videoId') videoId: string) {
    if (!videoId) {
      throw new Error('Video ID is required');
    }

    const audioFilePath = await this.service.downloadAndExtractAudio(videoId);
    
    return {
      success: true,
      message: 'Audio extracted successfully',
      audioFilePath,
    };
  }

}
