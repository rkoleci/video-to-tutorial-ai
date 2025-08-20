import {
    Controller,
    Post,
    Body,
    UseGuards,
    HttpCode,
} from '@nestjs/common';
import { Jwt } from 'src/auth/jwt.guard';
import YoutubeService from './youtube.service';

@Controller('core')
// @UseGuards(Jwt)
export class CoreController {
    constructor(private readonly ytService: YoutubeService) { }


    // TODO: delete this controller entirely
    @Post('extract')
    @HttpCode(200)
    async extractAudio(@Body('videoId') videoId: string): Promise<string> {
        if (!videoId) {
            throw new Error('Video ID is required');
        }

        this.ytService.downloadAudio(videoId);
      
        return 'Audio extraction started' ;
    }

}
