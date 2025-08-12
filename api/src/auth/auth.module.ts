import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { Jwt } from './jwt.guard';

@Global()
@Module({
  imports: [ConfigModule, PassportModule, UserModule],
  providers: [GoogleStrategy, Jwt,     ],
  controllers: [AuthController],
  exports: [  Jwt,UserModule   ]
})
export class AuthModule {}