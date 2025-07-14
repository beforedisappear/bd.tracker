import { Avatar } from '@/shared/ui/s';
import { BoardAssigneesPopover, TaskExtended } from '@/entities/Board';

interface Props {
  taskId: TaskExtended['id'];
  assignees: TaskExtended['assignees'];
  author: TaskExtended['author'];
}

export function TaskOverviewSheetAssignees(props: Props) {
  const { taskId, assignees, author } = props;

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-xs text-muted-foreground'>Автор и ответственные</div>

      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2 text-sm'>
          <span>Автор:</span>
          <Avatar
            key={author?.id}
            src=''
            alt={author?.name}
            initials={author?.name}
            className='flex justify-center items-center h-6 w-6 text-xs border-2 border-muted'
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
