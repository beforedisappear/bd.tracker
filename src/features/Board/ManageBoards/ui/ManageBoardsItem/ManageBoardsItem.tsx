import { RenameInput, type RenameInputMethods } from '@/shared/ui/c';
import { ManageBoardsItemMenu } from '../ManageBoardsItemMenu';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useRef, type MouseEvent } from 'react';
import {
  boardQueries,
  RenameBoardSchema,
  type SummaryBoard,
} from '@/entities/Board';

import { cn } from '@/shared/lib/css';
import { buttonVariants } from '@/shared/ui/s';
import { getProjectByIdRoutePath } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';

interface Props {
  board: SummaryBoard;
  isActive: boolean;
  tenant: string;
  projectId: string;
  countOfBoards: number;
}

export function ManageBoardsItem(props: Props) {
  const { board, isActive, tenant, projectId, countOfBoards } = props;

  const { push } = useRouter();
  const methodsRef = useRef<RenameInputMethods>(null);

  const { mutateAsync: renameBoard } = useMutation(boardQueries.renameBoard());

  const onSelectBoard = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;

    if (!currentTarget.contains(target)) return;

    target.scrollIntoView({ behavior: 'smooth' });

    push(getProjectByIdRoutePath(tenant, projectId, board.id));
  };

  const onRename = (name: string) => {
    renameBoard({ id: board.id, name, projectId: board.projectId })
      .then(() => {})
      .catch(e => toast.error(getErrorMessage(e)));
  };

  return (
    <div
      key={board.id}
      onClick={onSelectBoard}
      className={cn(
        buttonVariants({ variant: isActive ? null : 'ghost' }),
        'rounded-b-none font-normal cursor-pointer',
        { 'bg-sidebar-accent': isActive },
      )}
    >
      <RenameInput
        key={`${board.id}-${board.name}`}
        initialName={board.name}
        schema={RenameBoardSchema}
        methodsRef={methodsRef}
        onRename={onRename}
      />

      <ManageBoardsItemMenu
        boardId={board.id}
        countOfBoards={countOfBoards}
        onRenameBoard={() => methodsRef.current?.onStartEditing?.()}
      />
    </div>
  );
}
