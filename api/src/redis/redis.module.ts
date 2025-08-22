import Redis from 'ioredis';
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

export const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: async () => {
    const redis = new Redis({
      host: 'localhost',  
      port: 6379,
    });

    redis.on('connect', () => console.log('Redis connected'));
    redis.on('error', (err) => console.error('Redis error', err));

    return null;
  },
};


@Module({
  providers: [RedisProvider, RedisService],
  exports: [RedisProvider, RedisService],  
})
export class MyRedisModule {}