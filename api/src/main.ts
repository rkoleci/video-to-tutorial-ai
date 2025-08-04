import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path'; 

const env = process.env.NODE_ENV || 'development';
console.log(111, 'MODE: ', env)

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`)
});


async function bootstrap() {  
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
