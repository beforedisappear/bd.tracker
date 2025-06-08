import { Sheet } from '@/shared/ui/c';

import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { taskQueries } from '@/entities/Board/api/queries';

export const TaskOverviewSheet = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams()!;
  const taskId = searchParams.get('task');

  const { data: task } = useQuery({
    ...taskQueries.getTaskById({ taskId: taskId! }),
    enabled: !!taskId,
  });

  console.log(task);

  const onClose = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('task');
    push(`?${newSearchParams.toString()}`);
  };

  return (
    <Sheet
      title=''
      open={!!taskId}
      onOpenChange={() => {}}
      modal={false}
      content={{
        className: 'w-full max-w-md',
        side: 'right',
        onClickOnCloseButton: onClose,
      }}
    ></Sheet>
  );
};
