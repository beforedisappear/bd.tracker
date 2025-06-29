import { Skeleton } from '@/shared/ui/s';

interface Props {}

export function SelectTeamItemLoading({}: Props) {
  return (
    <Skeleton numberOfTextLines={1} className='w-full py-4 px-5 rounded-lg' />
  );
}
