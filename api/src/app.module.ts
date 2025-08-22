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
import YoutubeService from './core/youtube.service';
import { CoreModule } from './core/core.module';
import { MyRedisModule } from './redis/redis.module';
import { UsageModule } from './usage/usage.module';

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
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database:  process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true ,
        // ssl: {
        //   rejectUnauthorized: tru,
        // },
        // extra: {
        //   ssl: {
        //     rejectUnauthorized: false,
        //   },
        // },
      }),
      // inject: [ ],
    }),
    
    
 
    TutorialModule,
    RabbitMqModule,
    ExtractionModule,
    FileModule,
    TextModule,
    AuthModule,
    CoreModule,
    MyRedisModule,
    UsageModule
    ], 
  controllers: [AppController],
   providers: [AppService], 
   

})
export class AppModule {}

 