import { Button } from '@/shared/ui/c';

import { toast } from 'sonner';

import { useBoardStore } from '@/entities/Board';

export const useShowNotAllowedToMoveItemsToast = () => {
  const clearAllMapFilters = useBoardStore(state => state.clearAllMapFilters);

  const onResetFilters = () => {
    clearAllMapFilters();
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
