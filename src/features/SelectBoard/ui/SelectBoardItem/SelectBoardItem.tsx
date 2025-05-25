import { SelectBoardItemMenu } from '../SelectBoardItemMenu/SelectBoardItemMenu';

import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/css';
import { buttonVariants } from '@/shared/ui/s';
import { getProjectByIdRoutePath } from '@/shared/config/routes';

import type { SummaryBoard } from '@/entities/Board';
import { MouseEvent } from 'react';

interface Props {
  board: SummaryBoard;
  isActive: boolean;
  tenant: string;
  projectId: string;
}

export function SelectBoardItem(props: Props) {
  const { board, isActive, tenant, projectId } = props;

  const { push } = useRouter();

  const onSelectBoard = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;

    if (!currentTarget.contains(target)) return;

    push(getProjectByIdRoutePath(tenant, projectId, board.id));
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
      <span>{board.name}</span>
      <SelectBoardItemMenu />
    </div>
  );
}
