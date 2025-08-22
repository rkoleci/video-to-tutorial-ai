import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsageService } from './usage.service';
import { Usage } from './usage.entity';

@Injectable()
export class IpLimitMiddleware implements NestMiddleware {
  constructor(private readonly usageService: UsageService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.connection.remoteAddress;
    console.log(111, 'ip', ip)

    const usage: Usage = await this.usageService.update(ip as string);

    if (!usage) {
      throw new ForbiddenException('Too many requests from this IP');
    }

    if (usage?.hits > 3) {
      throw new ForbiddenException('Too many requests from this IP');
    }

    if (usage?.hits <= 3) {
      next()
    }
  }
}
