import { Button } from '@/shared/ui/c';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteProjectContent(props: Props) {
  const { onClose, onConfirm } = props;

  return (
    <div>
      <p>При удалении проекта будут удалены все задачи в нём</p>
      <div className='flex gap-2'>
        <Button onClick={onClose} variant='outline'>
          Отмена
        </Button>
        <Button onClick={onConfirm} variant='destructive'>
          Да
        </Button>
      </div>
    </div>
  );
}
