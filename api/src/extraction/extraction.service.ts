import { Injectable, Logger } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export default class ExtractionService {
  private readonly logger = new Logger(ExtractionService.name);

 async downloadVideo(url: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ytdl(url)
        .pipe(fs.createWriteStream(outputPath))
        .on('finish', () => resolve())
        .on('error', (err) => reject(err));
    });
  }

  async extractAudioFile(videoPath: string, audioOutputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .noVideo()
        .audioCodec('libmp3lame')
        .save(audioOutputPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });
  }


}