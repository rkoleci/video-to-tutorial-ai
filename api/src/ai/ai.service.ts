import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export default class AIService {
  private readonly logger = new Logger(AIService.name);
  private openai: OpenAI;

  constructor() {
    const openai = new OpenAI({
      baseURL: process.env.DEEPSEEK_API_URL,
      apiKey: process.env.DEEPSEEK_API_KEY,
    });

    this.openai = openai;
  }

  async completion(): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
      model: 'deepseek-chat',
    });

    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content || '';
  }
}
