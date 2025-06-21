import { Avatar } from '@/shared/ui/s';
import { BoardAssigneesPopover, Task } from '@/entities/Board';

interface Props {
  taskId: Task['id'];
  assignees: Task['assignees'];
}

export function TaskOverviewSheetAssignees(props: Props) {
  const { taskId, assignees } = props;

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-xs text-muted-foreground'>Автор и ответственные</div>

      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2 text-sm'>
          <span>Автор:</span>
          <Avatar
            key={assignees[0]?.id}
            src=''
            alt={assignees[0]?.name}
            initials={assignees[0]?.name}
            className='flex justify-center items-center h-5 w-5'
          />
        </div>

        <div className='flex items-center gap-2 text-sm'>
          <span>Ответственные:</span>
          <BoardAssigneesPopover
            taskId={taskId}
            assignees={assignees}
            direction='leftToRight'
            avatarLimit={10}
            align='start'
          />
        </div>
      </div>
    </div>
  );
}
