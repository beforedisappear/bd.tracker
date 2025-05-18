import { createClient, type RedisClientType } from 'redis';

let redisService: RedisClientType | null = null;

export async function getRedisService() {
  if (!redisService) {
    redisService = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });
    redisService.on('error', err => console.error('Redis Client Error', err));

    await redisService.connect();
  }

  return redisService;
}
