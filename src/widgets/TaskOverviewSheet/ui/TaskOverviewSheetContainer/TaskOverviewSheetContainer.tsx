import { taskQueries } from '@/entities/Board';
import { Skeleton } from '@/shared/ui/s';
import { useQuery } from '@tanstack/react-query';
import { TaskOverviewSheetContent } from '../TaskOverviewSheetContent/TaskOverviewSheetContent';
import { ErrorBoundary } from '@/shared/ui/c';

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

  if (isLoading) return <Skeleton />;
  else if (isError || !isSuccess) return <ErrorBoundary />;

  return <TaskOverviewSheetContent task={task} />;
}
