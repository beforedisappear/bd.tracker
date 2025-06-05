import type { Task } from '@/entities/Task';

interface Props {
  data: Task;
}

export function ViewBoardTask(props: Props) {
  const {
    data: {},
  } = props;

  return (
    <div
      className={`flex flex-col min-h-24 h-auto gap-2 bg-card rounded-md p-3 shadow-sm border`}
    >
      <h4 className='font-normal text-sm line-clamp-1'>{''}</h4>
    </div>
  );
}
