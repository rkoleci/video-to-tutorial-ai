import { Controller,  Post,  } from '@nestjs/common';
import AIService from './ai.service';
import OpenAI from 'openai';

@Controller('ai')
export class AiController {

    constructor(private readonly aiService:AIService) {}

 @Post('transcribe')
  async extractAudio( ): Promise<OpenAI.Audio.Transcription>  {
 
    const transriptoin = await this.aiService.transcribeAudioDetailed('C:\\Users\\r.koleci\\Documents\\video-to-tuts-ai\\api\\audio\\podcast.mp3', '');
    
    return  transriptoin
  }

}
