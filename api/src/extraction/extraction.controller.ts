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
import ExtractionService from './extraction.service';
import { PuppeteerYoutubeSubtitlesService } from './pupeeter.service';
import { Jwt } from 'src/auth/jwt.guard';

@Controller('extraction')
  @UseGuards(Jwt)
export class ExtractionController {
  constructor(private readonly service: ExtractionService, private readonly pupeter: PuppeteerYoutubeSubtitlesService) {}

 @Post('extract')
  async extractAudio(@Body('videoId') videoId: string) {
    if (!videoId) {
      throw new Error('Video ID is required');
    }

    const audioFilePath = await this.service.downloadAudio(videoId);
    
    return {
      success: true,
      message: 'Audio extracted successfully',
      audioFilePath,
    };
  }

   @Post('subtitles')
  async extractSubs(@Body('videoId') videoId: string) {
    if (!videoId) {
      throw new Error('Video ID is required');
    }

    const audioFilePath = await this.pupeter.fetchSubtitles(`https://www.youtube.com/watch?v=${videoId}`);
    
    return {
      success: true,
      message: 'Audio extracted successfully',
      audioFilePath,
    };
  }

}
