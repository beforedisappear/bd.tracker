import { Task, BoardTaskHeader } from '@/entities/Board';

import { TaskOverviewSheetAssignees } from '../TaskOverviewSheetAssignees/TaskOverviewSheetAssignees';
import { TaskOverviewSheetDetails } from '../TaskOverviewSheetDetails/TaskOverviewSheetDetails';
import { TaskOverviewSheetStickers } from '../TaskOverviewSheetStickers/TaskOverviewSheetStickers';
import { TaskOverviewSheetDateRange } from '../TaskOverviewSheetDateRange/TaskOverviewSheetDateRange';
import { TaskOverviewSheetDescription } from '../TaskOverviewSheetDescription/TaskOverviewSheetDescription';

interface Props {
  task: Task;
  onClose: () => void;
}

export function TaskOverviewSheetContent(props: Props) {
  const { task, onClose } = props;

  return (
    <div className='flex flex-col gap-4'>
      <BoardTaskHeader
        key={`${task.id}-${task.isDone}-${task.title}`}
        taskId={task.id}
        title={task.title}
        isDone={task.isDone}
        color={task.color}
        titleClassName='text-xl font-semibold'
        offCheckTitleStyle
        onClose={onClose}
      />

      <TaskOverviewSheetAssignees taskId={task.id} assignees={task.assignees} />

      <TaskOverviewSheetDetails
        createdAt={task.createdAt}
        updatedAt={task.updatedAt}
      />

      <TaskOverviewSheetStickers taskId={task.id} stickers={task.stickers} />

      <TaskOverviewSheetDateRange
        taskId={task.id}
        startDate={task.startDate}
        endDate={task.endDate}
      />

      <TaskOverviewSheetDescription
        description={task.description}
        taskId={task.id}
      />
    </div>
  );
}
