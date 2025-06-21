import { RenameInput, type RenameInputMethods } from '@/shared/ui/c';
import { ViewBoardColumnMenu } from '../ViewBoardColumnMenu/ViewBoardColumnMenu';

import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import { columnQueries } from '@/entities/Board';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';

import { RenameColumnSchema } from '@/entities/Team';

interface Props {
  columnId: string;
  name: string;
  length: number;
}

export function ViewBoardColumnHeader(props: Props) {
  const { columnId, name, length } = props;

  const methodsRef = useRef<RenameInputMethods>(null);
  const { mutateAsync: renameColumn } = useMutation(
    columnQueries.renameColumn(),
  );

  const onRenameColumn = (name: string) => {
    renameColumn({
      columnId,
      name,
    })
      .then(() => {})
      .catch(e => toast.error(getErrorMessage(e)));
  };

  return (
    <div className='flex justify-between items-center mb-4'>
      <RenameInput
        methodsRef={methodsRef}
        initialName={name}
        schema={RenameColumnSchema}
        onRename={onRenameColumn}
        className='font-medium text-lg'
      />

      <div className='flex items-center gap-2'>
        <ViewBoardColumnMenu
          columnId={columnId}
          onRenameColumn={() => methodsRef.current?.onStartEditing?.()}
        />

        <span className='bg-primary/10 text-primary px-2 py-1 rounded-full text-sm'>
          {length}
        </span>
      </div>
    </div>
  );
}
