import { Sheet } from '@/shared/ui/c';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';

import { cn } from '@/shared/lib/css';
import { TaskOverviewSheetContainer } from '../TaskOverviewSheetContainer/TaskOverviewSheetContainer';

export const TaskOverviewSheet = () => {
  const { push } = useRouter();
  const { isMobile, isDesktop } = useDeviceType();
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
      onOpenChange={() => {}}
      modal={false}
      content={{
        className: cn('', {
          '': isMobile,
          'w-full max-w-md': isDesktop,
        }),
        side: 'right',
        onClickOnCloseButton: onClose,
      }}
    >
      <TaskOverviewSheetContainer taskId={taskId} />
    </Sheet>
  );
};
