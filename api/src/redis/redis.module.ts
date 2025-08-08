import Redis from 'ioredis';
import { Module } from '@nestjs/common';

export const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: async () => {
    // const redis = new Redis({
    //   host: 'localhost',  
    //   port: 6379,
    // });

    // redis.on('connect', () => console.log('Redis connected'));
    // redis.on('error', (err) => console.error('Redis error', err));

    // return redis;
  },
};


@Module({
  providers: [RedisProvider],
  exports: [RedisProvider], // export it to use in other modules
})
export class MyRedisModule {}