import { createClient, type RedisClientType } from 'redis';

let subscriber: RedisClientType | null = null;

async function getRedisSubscriber() {
  if (!subscriber) {
    subscriber = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });

    subscriber.on('error', err => console.error('Redis Subscriber Error', err));
    await subscriber.connect();
  }

  return subscriber;
}

export async function subscribeToChannel(
  channel: string,
  handler: (message: string) => void,
) {
  const sub = await getRedisSubscriber();
  await sub.subscribe(channel, handler);
}
