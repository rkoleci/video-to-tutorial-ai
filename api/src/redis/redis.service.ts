// redis.service.ts
import { Inject, Injectable } from '@nestjs/common';
import Redis, { Pipeline } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async hset(key: string, field: string, value: string): Promise<void> {
    await this.redisClient.hset(key, field, value);
  }

  async hget(key: string, field: string): Promise<string | null> {
    return this.redisClient.hget(key, field);
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    return this.redisClient.hgetall(key);
  }

  async hdel(key: string, field: string): Promise<number> {
    return this.redisClient.hdel(key, field);
  }

  async del(key: string): Promise<number> {
    return this.redisClient.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redisClient.exists(key);
    return result === 1;
  }

  async flushAll(): Promise<string> {
    return this.redisClient.flushall();
  }

  pipeline():  any {
    return this.redisClient.pipeline();
  }
}
