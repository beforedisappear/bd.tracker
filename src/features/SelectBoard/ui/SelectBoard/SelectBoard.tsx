import { ChevronRight, ChevronLeft } from 'lucide-react';

import { SelectBoardItem } from '../SelectBoardItem/SelectBoardItem';
import { SelectBoardLoading } from './SelectBoard.loading';
import { ScrollArea, Button } from '@/shared/ui/c';

import { boardQueries } from '@/entities/Board';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

export function SelectBoard() {
  const { tenant, ids } = useParams<{
    tenant: string;
    ids: string[];
  }>()!;
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const projectId: string = ids[0];
  const boardId = ids[1] as string | undefined;

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

  if (isLoading) return <SelectBoardLoading />;
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
              <SelectBoardItem
                key={board.id}
                board={board}
                isActive={isActive}
                tenant={tenant}
                projectId={projectId}
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
