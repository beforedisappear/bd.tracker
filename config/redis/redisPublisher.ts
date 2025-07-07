import { createClient, type RedisClientType } from 'redis';

let publisher: RedisClientType | null = null;

async function getRedisPublisher() {
  if (!publisher) {
    publisher = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });

    publisher.on('error', err => console.error('Redis Publisher Error', err));
    await publisher.connect();
  }

  return publisher;
}

export async function publish(channel: string, message: string) {
  const pub = await getRedisPublisher();
  await pub.publish(channel, message);
}
