import { Inject, Injectable, Logger } from '@nestjs/common';  
import AIService from 'src/ai/ai.service';

@Injectable()
export default class SpeechToTextService {
    private readonly logger = new Logger(SpeechToTextService.name);
 
 
    constructor(private readonly aiService: AIService) {

    }
   


    async audioToText(audioFilePath: string, lang: string) {
        return this.aiService.speechToTextAI(audioFilePath, lang)
    }
}
