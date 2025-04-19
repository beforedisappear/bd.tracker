import { Crown } from 'lucide-react';

import Link from 'next/link';

import { getTeamRoute } from '@/shared/config/routes';

import type { Team } from '@/entities/Team';

interface Props {
  data: Team;
}

export function SelectTeamItem({ data }: Props) {
  return (
    <Link
      key={data.id}
      href={getTeamRoute(data.slug)}
      className='flex justify-between w-full py-4 px-5 text-left rounded-lg transition-all duration-300
      bg-zinc-300/30 text-zinc-800 hover:bg-zinc-300/50 hover:text-black
      dark:bg-zinc-800/30 dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-white'
    >
      <span className='line-clamp-1 break-all '>{data.name}</span>
      {data.owned && <Crown />}
    </Link>
  );
}
