import { Badge } from '@/shared/ui/s';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Props {
  createdAt: string;
  updatedAt: string;
}

export function TaskOverviewSheetDetails(props: Props) {
  const { createdAt, updatedAt } = props;

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-xs text-muted-foreground'>
        Дополнительная информация
      </div>

      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2 text-sm'>
          <span>Создано:</span>
          <Badge variant='outline'>
            {format(new Date(createdAt), 'd MMM HH:mm', {
              locale: ru,
            })}
          </Badge>
        </div>

        <div className='flex items-center gap-2 text-sm'>
          <span>Обновлено:</span>
          <Badge variant='outline'>
            {format(new Date(updatedAt), 'd MMM HH:mm', {
              locale: ru,
            })}
          </Badge>
        </div>
      </div>
    </div>
  );
}
