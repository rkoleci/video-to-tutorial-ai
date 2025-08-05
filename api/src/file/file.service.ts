import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export default class FileService {
  async downloadFile(fid: string): Promise<string> {
    return fid;
  }

  async saveFile(file: any): Promise<string> {
    return 'url';
  }

  async deleteFile(fileUrl: any): Promise<boolean> {
    return true;
  }
}
