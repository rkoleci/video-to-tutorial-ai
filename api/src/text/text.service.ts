import { Injectable, Logger } from '@nestjs/common';
import AIService from 'src/ai/ai.service';

@Injectable()
export default class TextService {


  constructor(private readonly aiService: AIService) {  }

  async getText(): Promise<string> {
    return this.aiService.completion();
  }

 
}
