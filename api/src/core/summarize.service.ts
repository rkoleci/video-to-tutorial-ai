import { Inject, Injectable, Logger } from '@nestjs/common';  
import AIService from 'src/ai/ai.service';

@Injectable()
export default class SummarizeService {
    private readonly logger = new Logger(SummarizeService.name);
 
 
    constructor(private readonly aiService: AIService) {

    }
   


    async summarizeText(content: string) {
        return this.aiService.completeTextPrompt(content)
    }
}
