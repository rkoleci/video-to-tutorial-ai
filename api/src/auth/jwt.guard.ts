import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { TokenPayload, UserService } from 'src/user/user.service';

@Injectable()
export class Jwt implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('No authorization token provided');
    }
    // Decode token
    let decoded: TokenPayload | null = await this.userService.decryptLoginToken(token)
    // if (!decoded) {
    //   throw new UnauthorizedException('Invalid token format');
    // }

   

    if (decoded && Date.now() > decoded.expiresAt) {
      throw new UnauthorizedException('Token expired');
    }

    // Verify token matches DB loginToken for userId
    const payload: TokenPayload | null = decoded
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userService.findUserById(payload.userId);

    if (!user || user.loginToken !== token) {
      throw new UnauthorizedException('Invalid token');
    }

    // Attach user to request for controllers
    (request as any).user = user;

    return true;
  }

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const request: Request = context.switchToHttp().getRequest();
  //   const token = request.headers['authorization']?.replace('Bearer ', '');

  //   if (!token) {
  //     throw new UnauthorizedException('No authorization token provided');
  //   }

  //   // Decode token
  //   let decoded: { userId: number; expiresAt: number };
  //   try {
  //     const decodedStr = Buffer.from(token, 'base64').toString('utf8');
  //     const [payloadStr] = decodedStr.split(':');
  //     decoded = JSON.parse(payloadStr);
  //   } catch {
  //     throw new UnauthorizedException('Invalid token format');
  //   }

  //   if (Date.now() > decoded.expiresAt) {
  //     throw new UnauthorizedException('Token expired');
  //   }

  //   // Verify token matches DB loginToken for userId
  //   const user = await this.userService.findUserById(String(decoded.userId));

  //   if (!user || user.loginToken !== token) {
  //     throw new UnauthorizedException('Invalid token');
  //   }

  //   // Attach user to request for controllers
  //   (request as any).user = user;

  //   return true;
  // }
}
