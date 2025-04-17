import { createClient } from 'redis';

export const redisService = await createClient({
  socket: { host: 'localhost', port: 6379 },
})
  .on('error', err => console.log('Redis Client Error', err))
  .connect();
