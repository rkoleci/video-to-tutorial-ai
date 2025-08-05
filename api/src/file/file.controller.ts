import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import FileService from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly service: FileService) {}

  @Get(":fid")
  downloadFile(@Param('fid') fid: string): Promise<void> {
    return this.service.downloadFile(fid);
  }
 
 
}