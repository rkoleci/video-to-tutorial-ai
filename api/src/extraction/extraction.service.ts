import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export default class ExtractionService {
  private readonly logger = new Logger(ExtractionService.name);
  private readonly audioPath = './audio';
  private readonly execAsync = promisify(exec);
  private ytDlpReady = false;

  constructor() {
    this.initializeService();
  }

  private async initializeService(): Promise<void> {
    this.ensureDirectoriesExist();
    await this.ensureYtDlpInstalled();
  }

  private ensureDirectoriesExist(): void {
    if (!fs.existsSync(this.audioPath)) {
      fs.mkdirSync(this.audioPath, { recursive: true });
    }
  }

  private async ensureYtDlpInstalled(): Promise<void> {
    try {
      await this.execAsync('yt-dlp --version');
      this.logger.log('yt-dlp is already installed');
      this.ytDlpReady = true;
      return;
    } catch (error) {
      this.logger.log('yt-dlp not found, attempting to install...');
    }

    try {
      // Install yt-dlp using pip
      await this.execAsync('pip install yt-dlp');
      this.ytDlpReady = true;
      this.logger.log('yt-dlp installation completed successfully');
    } catch (error) {
      this.logger.error('Failed to install yt-dlp:', error.message);
      throw new Error('yt-dlp installation failed');
    }
  }

  async downloadAudio(videoId: string): Promise<string> {
    try {
      if (!this.ytDlpReady) {
        await this.ensureYtDlpInstalled();
      }

      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const outputTemplate = path.join(this.audioPath, '%(title)s.%(ext)s');
      
      const command = `yt-dlp -x --audio-format mp3 --audio-quality 0 -o "${outputTemplate}" "${videoUrl}"`;
      
      this.logger.log(`Executing: ${command}`);
      const { stdout, stderr } = await this.execAsync(command);
      
      if (stderr && !stderr.includes('[download]')) {
        throw new Error(stderr);
      }

      // Parse output to get filename
      const match = stdout.match(/\[ExtractAudio\] Destination: (.+)/);
      const audioFilePath = match ? match[1] : null;

      if (!audioFilePath || !fs.existsSync(audioFilePath)) {
        throw new Error('Audio file not found after extraction');
      }

      this.logger.log(`Audio extraction completed: ${audioFilePath}`);
      return audioFilePath;

    } catch (error) {
      this.logger.error(`Error with yt-dlp: ${error.message}`);
      throw error;
    }
  }

}