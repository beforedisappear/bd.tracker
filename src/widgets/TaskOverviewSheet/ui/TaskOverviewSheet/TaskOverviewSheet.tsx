import { Sheet } from '@/shared/ui/c';
import { TaskOverviewSheetContainer } from '../TaskOverviewSheetContainer';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';

import { cn } from '@/shared/lib/css';

export const TaskOverviewSheet = () => {
  const { push } = useRouter();
  const { isDesktop } = useDeviceType();
  const searchParams = useSearchParams()!;
  const taskId = searchParams.get('task');

  const onClose = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('task');
    push(`?${newSearchParams.toString()}`);
  };

  return (
    <Sheet
      title=''
      open={!!taskId}
      modal={false}
      content={{
        className: cn('', {
          'w-full max-w-md pt-10': isDesktop,
        }),
        side: 'right',
        onClickOnCloseButton: onClose,
      }}
    >
      <TaskOverviewSheetContainer taskId={taskId} />
    </Sheet>
  );
};
