import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import * as fs from 'fs';

@Injectable()

export default class AIService {
  private readonly logger = new Logger(AIService.name);
  private openAI: OpenAI;

  constructor(private configService: ConfigService) {
    const openAI = new OpenAI({
      baseURL: this.configService.get('OPENAI_API_URL'),
      apiKey: this.configService.get('OPEN_AI_API_KEY'),
    });

    this.openAI = openAI
  }

  public async completeTextPrompt(content: string) {
    return this.completion(content)
  }

  public async speechToTextAI(audioFilePath: string, language: string) {
    return this.transcribeAudioDetailed(audioFilePath, language)
  }


  private async completion(content: string): Promise<string> {
    const completion = await this.openAI.chat.completions.create({
      messages: [{ role: 'system', content }],
      model: 'deepseek-chat',
    });

    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content || '';
  }

  private async transcribeAudioDetailed(
    audioFilePath: string,
    language?: string
  ): Promise<OpenAI.Audio.Transcription> {
    try {
      this.logger.log(`Transcribing audio file with details: ${audioFilePath}`);

      if (!fs.existsSync(audioFilePath)) {
        throw new Error(`Audio file not found: ${audioFilePath}`);
      }

      const transcription = await this.openAI.audio.transcriptions.create({
        file: fs.createReadStream(audioFilePath),
        model: 'whisper-1',
        language: language,
        response_format: 'verbose_json', // Returns detailed info
        timestamp_granularities: ['word'], // Optional: word-level timestamps
      });

      this.logger.log('Detailed audio transcription completed successfully');
      return transcription;

    } catch (error) {
      this.logger.error('Error transcribing audio with details:', error);
      throw new Error(`Failed to transcribe audio: ${error.message}`);
    }
  }
}
