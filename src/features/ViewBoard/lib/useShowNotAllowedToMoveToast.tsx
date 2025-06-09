import { Button } from '@/shared/ui/c';

import { useBoardStore } from '@/entities/Board';

import { toast } from 'sonner';

export const useShowNotAllowedToMoveItemsToast = () => {
  const clearMapColorTaskFilterByBoardId = useBoardStore(
    state => state.clearMapColorTaskFilterByBoardId,
  );

  const onResetFilters = () => {
    clearMapColorTaskFilterByBoardId();
    toast.dismiss();
  };

  const showNotAllowedToMoveItemsToast = () => {
    toast.warning('Перетаскивание недоступно в режиме фильтрации', {
      action: (
        <Button onClick={onResetFilters} variant='secondary' size='sm'>
          Сбросить фильтры
        </Button>
      ),
    });
  };

  return { showNotAllowedToMoveItemsToast };
};
