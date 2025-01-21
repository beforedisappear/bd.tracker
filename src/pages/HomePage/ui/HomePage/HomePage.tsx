import { redis } from '@/shared/lib/db/redis';

export async function HomePage() {
  console.log(await redis.get('key'));

  return <div></div>;
}
