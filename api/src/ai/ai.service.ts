import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import * as fs from 'fs';
import { Jwt } from 'src/auth/jwt.guard';

@Injectable()
   @UseGuards(Jwt)

export default class AIService {
  private readonly logger = new Logger(AIService.name);
  private openai: OpenAI;
  private openAiWhisper: OpenAI;

  constructor(private configService: ConfigService) {
    const openai = new OpenAI({
      baseURL: this.configService.get('DEEPSEEK_API_URL'),
      apiKey: this.configService.get('DEEPSEEK_API_KEY'),
    });
    
    this.openai = openai;

     const openAiWhisper = new OpenAI({
      baseURL: this.configService.get('OPEN_AI_AUDIO_TRANSCRIPTIONS_URL'),
      apiKey: this.configService.get('OPEN_AI_API_KEY'),
    });
    
    this.openAiWhisper = openAiWhisper;
  }

  async completion(): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
      model: 'deepseek-chat',
    });

    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content || '';
  }

   async transcribeAudioDetailed(
    audioFilePath: string,
    language?: string
  ): Promise<OpenAI.Audio.Transcription> {
    try {
      this.logger.log(`Transcribing audio file with details: ${audioFilePath}`);

      if (!fs.existsSync(audioFilePath)) {
        throw new Error(`Audio file not found: ${audioFilePath}`);
      }

      const transcription = await this.openAiWhisper.audio.transcriptions.create({
        file: fs.createReadStream(audioFilePath),
        model: 'whisper-1',
        language: language,
        response_format: 'verbose_json', // Returns detailed info
        // timestamp_granularities: ['word'], // Optional: word-level timestamps
      });

      this.logger.log('Detailed audio transcription completed successfully', transcription);
      return transcription;

    } catch (error) {
      this.logger.error('Error transcribing audio with details:', error);
      throw new Error(`Failed to transcribe audio: ${error.message}`);
    }
  }
}
