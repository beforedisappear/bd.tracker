import { TaskOverviewSheetContent } from '../TaskOverviewSheetContent/TaskOverviewSheetContent';
import { ErrorBoundary } from '@/shared/ui/c';
import { TaskOverviewSheetContainerLoading } from './TaskOverviewSheetContainer.loading';

import { taskQueries } from '@/entities/Board';
import { useQuery } from '@tanstack/react-query';

interface Props {
  taskId: string | null;
}

export function TaskOverviewSheetContainer(props: Props) {
  const { taskId } = props;

  const {
    data: task,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    ...taskQueries.getTaskById({ taskId: taskId! }),
    enabled: !!taskId,
  });

  if (isLoading) return <TaskOverviewSheetContainerLoading />;
  else if (isError || !isSuccess)
    return <ErrorBoundary className='m-auto w-full h-full' />;

  return <TaskOverviewSheetContent task={task} />;
}
