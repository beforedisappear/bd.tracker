import { Users } from 'lucide-react';

interface Props {}

export function SelectTeamPlaceholder({}: Props) {
  return (
    <div className='py-4 flex flex-col items-center justify-center text-center'>
      <div className='bg-zinc-300/30 dark:bg-zinc-800/30 p-4 rounded-full mb-2'>
        <Users className='h-8 w-8 bg:text-zinc-900 dark:text-zinc-400' />
      </div>
      <h3 className='text-zinc-800 dark:text-zinc-300 mb-1'>
        Нет доступных команд
      </h3>
      <p className='text-zinc-500 text-sm max-w-64'>
        В данный момент у вас нет доступных команд для выбора
      </p>
    </div>
  );
}
