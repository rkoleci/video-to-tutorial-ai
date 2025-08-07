import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const env = process.env.NODE_ENV || 'development';
console.log(111, 'MODE: ', env);

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`),
});

async function bootstrap() {
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API docs')
    .setVersion('1.0')
    .build();

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

    app.enableCors({
    origin: ['http://localhost:3000'], // frontend URL(s) allowed to access the API
    credentials: true, // if you use cookies or authentication
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
