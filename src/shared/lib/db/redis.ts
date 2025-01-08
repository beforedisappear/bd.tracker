import { createClient } from 'redis';

export const redis = await createClient({
  socket: { host: 'localhost', port: 6379 },
})
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

redis.on('error', err => {
  console.error('Redis connection error:', err);
});
redis.on('connect', () => {
  console.log('Redis connected');
});
