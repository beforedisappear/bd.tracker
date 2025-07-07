import { ChevronRight, ChevronLeft } from 'lucide-react';

import { ManageBoardsItem } from '../ManageBoardsItem/ManageBoardsItem';
import { ManageBoardsLoading } from './ManageBoards.loading';
import { ScrollArea, Button } from '@/shared/ui/c';

import { useProject, useTenant } from '@/shared/lib/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState, useEffect } from 'react';
import { boardQueries } from '@/entities/Board';
import { useManageBoardsRealTime } from '../../lib';

//TODO: mb add resize observer
//TODO: add shadow for edges
export function ManageBoards() {
  const tenant = useTenant();
  const { projectId, boardId } = useProject();
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const {
    data: boards,
    isLoading,
    isError,
  } = useQuery(boardQueries.getAllBoards({ projectId }));

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const isScrollable =
      scrollRef.current.scrollWidth > scrollRef.current.clientWidth;

    setShowScrollButtons(isScrollable);
  }, [boards]);

  useManageBoardsRealTime(projectId);

  if (isLoading) return <ManageBoardsLoading />;
  else if (isError || !boards) return <></>;

  const handleScroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth;
    const clientWidth = scrollRef.current.clientWidth;

    const scrollAmount = clientWidth / 2;
    const isScrollable = scrollWidth > clientWidth;

    if (!isScrollable) return;

    scrollRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <ScrollArea
        // @ts-expect-error - type is not defined in the library
        type={null}
        scrollBar={{ orientation: 'horizontal' }}
        className=''
        viewportRef={scrollRef}
      >
        <div className='flex gap-2 items-center'>
          {boards.map(board => {
            const isActive = board.id === boardId;

            return (
              <ManageBoardsItem
                key={board.id}
                board={board}
                isActive={isActive}
                tenant={tenant}
                projectId={projectId}
                countOfBoards={boards.length}
              />
            );
          })}
        </div>
      </ScrollArea>

      {showScrollButtons && (
        <>
          <Button
            variant='ghost'
            size='icon'
            className='flex-shrink-0 md:hidden'
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft />
          </Button>

          <Button
            variant='ghost'
            size='icon'
            className='flex-shrink-0 md:hidden'
            onClick={() => handleScroll('right')}
          >
            <ChevronRight />
          </Button>
        </>
      )}
    </>
  );
}
