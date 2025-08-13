import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TutorialModule } from './tutorial/tutorial.module';
import { RabbitMqService } from './rabbitmq/rabbitmq.service';
import { RabbitMqModule } from './rabbitmq/rabbitmq.module';
import ExtractionService from './extraction/extraction.service';
import { ExtractionModule } from './extraction/extraction.module';
import { FileModule } from './file/file.module';
import { TextModule } from './text/text.module';
import { AuthModule } from './auth/auth.module';
import { MyRedisModule } from './redis/redis.module';
import { AIModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),
     
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule],
      useFactory: ( ) => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database:  process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true ,
        ssl: {
          rejectUnauthorized: false,
        },
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
      // inject: [ ],
    }),
    
    

    // Add your other feature modules here
    TutorialModule,
    // RabbitMqModule,
    ExtractionModule,
    FileModule,
    TextModule,
    AuthModule,
    MyRedisModule,
    AIModule
    ], 
  controllers: [AppController],
   providers: [AppService], 
   

})
export class AppModule {}

// next, setup multiole nodejs cosnumers, load testing