'use client';

import { Sheet } from '@/shared/ui/c';
import { TaskOverviewSheetContainer } from '../TaskOverviewSheetContainer';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useDeviceType } from '@/shared/lib/deviceType/c';

import { TASK_PARAM } from '@/shared/config/routes';

export const TaskOverviewSheet = () => {
  const { push } = useRouter();
  const { isMobile } = useDeviceType();
  const searchParams = useSearchParams()!;
  const taskId = searchParams.get(TASK_PARAM);

  const onClose = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(TASK_PARAM);
    push(`?${newSearchParams.toString()}`);
  }, [push, searchParams]);

  return (
    <Sheet
      title=''
      open={!!taskId}
      modal={isMobile}
      content={{
        className: `w-full 
        desktop:max-w-md desktop:pt-10 
        mobile:!max-w-full`,
        side: 'right',
        onClickOnCloseButton: onClose,
      }}
    >
      <TaskOverviewSheetContainer taskId={taskId} onClose={onClose} />
    </Sheet>
  );
};
