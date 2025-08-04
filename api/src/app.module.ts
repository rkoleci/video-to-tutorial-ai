import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorialModule } from './tutorial/tutorial.module';
import { RabbitMqService } from './rabbitmq/rabbitmq.service';
import { RabbitMqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    // This is where the TypeOrmModule.forRootAsync goes
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
    RabbitMqModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
