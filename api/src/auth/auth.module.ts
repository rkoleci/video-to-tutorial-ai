import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule, PassportModule],
  providers: [GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {}