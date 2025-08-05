import { Module } from '@nestjs/common';
import ExtractionService from './extraction.service';
import { ExtractionController } from './extraction.controller';

@Module({
  imports: [ ],
  providers: [ExtractionService],
  controllers: [ExtractionController],
})
export class ExtractionModule {}