import { Inject, Injectable, Logger } from '@nestjs/common';
import { exec } from 'youtube-dl-exec';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export default class YoutubeService {
    private readonly logger = new Logger(YoutubeService.name);

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



    async downloadAudio(url: string, output?: string): Promise<void> {

        try {
            // Step 1: Get video info
            this.logger.log(`Fetching video info for ${url}`);
            const videoInfo = await exec(url, { dumpSingleJson: true }) as any;
            
            console.log(111, 'Video Info:', {
                title: videoInfo.title,
                description: videoInfo.description?.substring(0, 200) + '...', // Log first 200 chars
                duration: videoInfo.duration,
                uploader: videoInfo.uploader
            });

            // Extract title and description
            const videoTitle = videoInfo.title || 'Unknown Title';
            const videoDescription = videoInfo.description || 'No description available';

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
            // return outputFilePath;
        } catch (error) {
            this.logger.error(`Failed to download audio: ${error.message}`, error.stack);
            throw error;
        }
    }

}
