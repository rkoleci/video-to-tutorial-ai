import { Injectable, Logger } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

@Injectable()
export default class ExtractionService {
  private readonly logger = new Logger(ExtractionService.name);
  private readonly downloadPath = '/tmp/youtube-downloads'; // Ubuntu-friendly temp path
  private readonly audioPath = './audio'; // Local audio storage
  private readonly execAsync = promisify(exec);
  private ffmpegReady = false;

  constructor() {
    this.initializeService();
  }

  private async initializeService(): Promise<void> {
    this.ensureDirectoriesExist();
    await this.ensureFFmpegInstalled();
  }

  private async ensureFFmpegInstalled(): Promise<void> {
    try {
      // Check if FFmpeg is already installed
      await this.execAsync('ffmpeg -version');
      this.logger.log('FFmpeg is already installed');
      this.ffmpegReady = true;
      return;
    } catch (error) {
      this.logger.log('FFmpeg not found, attempting to install...');
    }

    try {
      // Try to install FFmpeg using different methods
      await this.installFFmpeg();
      this.ffmpegReady = true;
      this.logger.log('FFmpeg installation completed successfully');
    } catch (error) {
      this.logger.error('Failed to install FFmpeg:', error.message);
      throw new Error('FFmpeg installation failed. Please install FFmpeg manually or ensure the process has sudo privileges.');
    }
  }

  private async installFFmpeg(): Promise<void> {
    const installCommands = [
      // Try with sudo first
      'sudo apt update && sudo apt install -y ffmpeg',
      // Try without sudo (if user has passwordless sudo or is root)
      'apt update && apt install -y ffmpeg',
      // Try using snap (alternative package manager)
      'sudo snap install ffmpeg',
      'snap install ffmpeg',
      // Try downloading static build
      await this.installStaticFFmpeg().catch(() => null)
    ].filter(Boolean);

    for (const command of installCommands) {
      if (typeof command === 'string') {
        try {
          this.logger.log(`Trying: ${command}`);
          await this.execAsync(command);
          
          // Verify installation
          await this.execAsync('ffmpeg -version');
          this.logger.log('FFmpeg installed successfully');
          return;
        } catch (error) {
          this.logger.warn(`Failed with command: ${command}`);
          continue;
        }
      }
    }

    throw new Error('All installation methods failed');
  }

  private async installStaticFFmpeg(): Promise<void> {
    this.logger.log('Attempting to install static FFmpeg build...');
    
    const ffmpegDir = '/tmp/ffmpeg-static';
    const ffmpegBinary = `${ffmpegDir}/ffmpeg`;
    
    // Create directory
    await this.execAsync(`mkdir -p ${ffmpegDir}`);
    
    // Download static FFmpeg build (adjust URL based on architecture)
    const downloadUrl = 'https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz';
    
    await this.execAsync(`cd ${ffmpegDir} && wget -q ${downloadUrl} -O ffmpeg-static.tar.xz`);
    await this.execAsync(`cd ${ffmpegDir} && tar -xf ffmpeg-static.tar.xz --strip-components=1`);
    await this.execAsync(`chmod +x ${ffmpegBinary}`);
    
    // Set FFmpeg path for fluent-ffmpeg
    ffmpeg.setFfmpegPath(ffmpegBinary);
    
    // Verify
    await this.execAsync(`${ffmpegBinary} -version`);
    this.logger.log('Static FFmpeg build installed successfully');
  }

  private ensureDirectoriesExist(): void {
    if (!fs.existsSync(this.downloadPath)) {
      fs.mkdirSync(this.downloadPath, { recursive: true });
    }
    if (!fs.existsSync(this.audioPath)) {
      fs.mkdirSync(this.audioPath, { recursive: true });
    }
  }

  async downloadAndExtractAudio(videoId: string): Promise<string> {
    try {
      // Ensure FFmpeg is ready before processing
      if (!this.ffmpegReady) {
        this.logger.log('Waiting for FFmpeg installation to complete...');
        await this.ensureFFmpegInstalled();
      }

      // Validate YouTube video ID
      if (!ytdl.validateID(videoId)) {
        throw new Error('Invalid YouTube video ID');
      }

      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      
      // Get video info
      const info = await ytdl.getInfo(videoId);
      const title = this.sanitizeFilename(info.videoDetails.title);
      
      this.logger.log(`Starting download for: ${title}`);

      // Define file paths
      const videoFilePath = path.join(this.downloadPath, `${title}.mp4`);
      const audioFilePath = path.join(this.audioPath, `${title}.mp3`);

      // Download video
      await this.downloadVideo(videoUrl, videoFilePath);
      
      // Extract audio
      await this.extractAudio(videoFilePath, audioFilePath);
      
      // Clean up video file (optional)
      this.cleanupVideoFile(videoFilePath);
      
      this.logger.log(`Audio extraction completed: ${audioFilePath}`);
      return audioFilePath;

    } catch (error) {
      this.logger.error(`Error processing video ${videoId}: ${error.message}`);
      throw error;
    }
  }

  private downloadVideo(videoUrl: string, filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const stream = ytdl(videoUrl, { 
        quality: 'highestaudio',
        filter: 'audioandvideo'
      });

      stream.pipe(fs.createWriteStream(filePath));
      
      stream.on('end', () => {
        this.logger.log('Video download completed');
        resolve();
      });
      
      stream.on('error', (error) => {
        this.logger.error('Video download failed:', error);
        reject(error);
      });

      // Track progress
      stream.on('progress', (chunkLength, downloaded, total) => {
        const percent = (downloaded / total * 100).toFixed(2);
        this.logger.log(`Download progress: ${percent}%`);
      });
    });
  }

  private extractAudio(videoPath: string, audioPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .audioCodec('mp3')
        .audioBitrate(128)
        .format('mp3')
        .on('start', (commandLine) => {
          this.logger.log('FFmpeg process started:', commandLine);
        })
        .on('progress', (progress) => {
          this.logger.log(`Audio extraction progress: ${progress.percent}%`);
        })
        .on('end', () => {
          this.logger.log('Audio extraction completed');
          resolve();
        })
        .on('error', (error) => {
          this.logger.error('Audio extraction failed:', error);
          reject(error);
        })
        .save(audioPath);
    });
  }

  private sanitizeFilename(filename: string): string {
    // Remove invalid characters for Linux/Unix file system
    return filename.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').substring(0, 200);
  }

  private cleanupVideoFile(filePath: string): void {
    try {
      fs.unlinkSync(filePath);
      this.logger.log('Video file cleaned up successfully');
    } catch (error) {
      this.logger.warn('Failed to cleanup video file:', error.message);
    }
  }

  async getVideoInfo(videoId: string): Promise<any> {
    try {
      if (!ytdl.validateID(videoId)) {
        throw new Error('Invalid YouTube video ID');
      }

      const info = await ytdl.getInfo(videoId);
      return {
        title: info.videoDetails.title,
        duration: info.videoDetails.lengthSeconds,
        author: info.videoDetails.author.name,
        views: info.videoDetails.viewCount,
        description: info.videoDetails.description,
      };
    } catch (error) {
      this.logger.error(`Error getting video info: ${error.message}`);
      throw error;
    }
  }

}