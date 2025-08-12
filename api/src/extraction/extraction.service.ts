import { Injectable, Logger } from '@nestjs/common';
import {exec} from 'youtube-dl-exec';
import * as path from 'path';
import * as fs from 'fs';
import { YoutubeTranscript } from 'youtube-transcript';

@Injectable()
export default class ExtractionService {
  private readonly logger = new Logger(ExtractionService.name);

  private readonly audioPath = path.resolve('./downloads/audio');
  private readonly videoPath = path.resolve('./downloads/video');

  constructor() {
    // Ensure download directories exist
    if (!fs.existsSync(this.audioPath)) {
      fs.mkdirSync(this.audioPath, { recursive: true });
    }
    if (!fs.existsSync(this.videoPath)) {
      fs.mkdirSync(this.videoPath, { recursive: true });
    }
  }

  /**
   * Download audio only (mp3) from a video URL
   * @param url string YouTube (or other) video URL
   * @param output optional filename (without path)
   */
  async downloadAudio(url: string, output?: string): Promise<string> {
  
    try { 
      // Step 1: Get video info
      this.logger.log(`Fetching video info for ${url}`);
      const videoInfo = await exec(url, { dumpSingleJson: true });
      const videoTitle = 'video titele 1';

      // Determine output file path
      const outputFileName = output || `${videoTitle}.mp3`;
      const outputFilePath = path.resolve(this.audioPath, outputFileName);

      this.logger.log(`Downloading audio to ${outputFilePath}`);

      // Step 2: Download audio only, convert to mp3
      await exec(url, {
        extractAudio: true,
        audioFormat: 'mp3',
        output: outputFilePath,
        // You can add other options like audioQuality: '0' (best)
      });

      this.logger.log(`Audio downloaded successfully: ${outputFilePath}`);
      return outputFilePath;
    } catch (error) {
      this.logger.error(`Failed to download audio: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Download video in best format available (mp4)
   * @param url string video URL
   * @param output optional filename (without path)
   */
  async downloadVideo(url: string, output?: string): Promise<string> {
    try {
      // Step 1: Get video info
      this.logger.log(`Fetching video info for ${url}`);
      const videoInfo = await exec(url, { dumpSingleJson: true });
      const videoTitle = 'video titele 1';

      // Determine output file path
      const outputFileName = output || `${videoTitle}.mp4`;
      const outputFilePath = path.resolve(this.videoPath, outputFileName);

      this.logger.log(`Downloading video to ${outputFilePath}`);

      // Step 2: Download video with best format mp4
      await exec(url, {
        output: outputFilePath,
        format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
      });

      this.logger.log(`Video downloaded successfully: ${outputFilePath}`);
      return outputFilePath;
    } catch (error) {
      this.logger.error(`Failed to download video: ${error.message}`, error.stack);
      throw error;
    }
  }

  async downloadSubtitles(url: string, lang = 'en', output?: string): Promise<string | null> {

   try {
     const subtitles = await YoutubeTranscript.fetchTranscript(url, {
        lang:   'en',
      });
      console.log(111, 'subtitles', subtitles)
   } catch (error) {
 this.logger.error(`Failed to download subtitles: ${error.message}`, error.stack);
    throw error;
   }
  try {
    const subtitlesPath = path.resolve('./downloads/subtitles');

    if (!fs.existsSync(subtitlesPath)) {
      fs.mkdirSync(subtitlesPath, { recursive: true });
    }

    // Step 1: Get video info and check for subtitles
    this.logger.log(`Fetching video info for subtitles from ${url}`);
    const videoInfo: any = await exec(url, { dumpSingleJson: true });
   
    // Check if subtitles exist for requested language
    if (
      !videoInfo.subtitles || 
      !videoInfo.subtitles[lang] ||
      videoInfo.subtitles[lang].length === 0
    ) {
      this.logger.warn(`No subtitles found for language '${lang}'`);
      return null;
    }

    // Determine output file name
    const videoTitle = videoInfo.fulltitle.replace(/[^\w\s]/gi, '').trim();
    const outputFileName = output || `${videoTitle}.${lang}.vtt`;
    const outputFilePath = path.resolve(subtitlesPath, outputFileName);

    this.logger.log(`Downloading subtitles to ${outputFilePath}`);

    // Step 2: Download subtitles only, no video/audio
    await exec(url, {
      skipDownload: true,
      writeSub: true,
      subLang: lang,
      subFormat: 'vtt',
      output: path.resolve(subtitlesPath, `${videoTitle}.%(ext)s`),
    });

    this.logger.log(`Subtitles downloaded successfully: ${outputFilePath}`);

    return outputFilePath;
  } catch (error) {
    this.logger.error(`Failed to download subtitles: ${error.message}`, error.stack);
    throw error;
  }
}
}
