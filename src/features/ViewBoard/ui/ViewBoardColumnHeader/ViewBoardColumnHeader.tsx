import { ViewBoardColumnMenu } from '../ViewBoardColumnMenu/ViewBoardColumnMenu';
import { Column } from '@/entities/Board';

interface Props {
  columnId: string;
  name: string;
  length: number;
}

export function ViewBoardColumnHeader(props: Props) {
  const { columnId, name, length } = props;

  return (
    <div className='flex justify-between items-center mb-4'>
      <p className='font-medium text-lg'>{name}</p>
      <div className='flex items-center gap-2'>
        <ViewBoardColumnMenu columnId={columnId} />

        <span className='bg-primary/10 text-primary px-2 py-1 rounded-full text-sm'>
          {length}
        </span>
      </div>
    </div>
  );
}
