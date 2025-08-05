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
import ytdl from 'ytdl-core';
import * as path from 'path';

@Controller('extraction')
export class ExtractionController {
  constructor(private readonly service: ExtractionService) {}

  @Get('download')
  async download(@Query('url') url: string) {
    if (!url || !ytdl.validateURL(url)) {
      return { error: 'Invalid URL' };
    }

    const videoPath = path.resolve(__dirname, '../../downloads/video.mp4');
    const audioPath = path.resolve(__dirname, '../../downloads/audio.mp3');

    try {
      await this.service.downloadVideo(url, videoPath);
      await this.service.extractAudioFile(videoPath, audioPath);
      return {
        message: 'Download and extraction complete',
        videoPath,
        audioPath,
      };
    } catch (err) {
      return { error: err.message };
    }
  }
}
