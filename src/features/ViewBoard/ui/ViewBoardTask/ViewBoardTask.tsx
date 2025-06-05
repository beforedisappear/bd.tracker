import type { Task } from '@/entities/Board';

interface Props {
  data: Task;
}

export function ViewBoardTask(props: Props) {
  const {
    data: { title },
  } = props;

  return (
    <div
      className={`flex flex-col min-h-24 h-auto gap-2 bg-card rounded-md p-3 shadow-sm border`}
    >
      <span className='font-normal text-sm line-clamp-1'>{title}</span>
    </div>
  );
}
