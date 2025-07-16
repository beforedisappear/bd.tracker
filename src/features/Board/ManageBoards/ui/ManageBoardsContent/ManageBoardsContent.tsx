import { ChevronRight, ChevronLeft } from 'lucide-react';

import { ManageBoardsItem } from '../ManageBoardsItem/ManageBoardsItem';
import { Button, ScrollArea } from '@/shared/ui/c';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { useProject, useTenant } from '@/shared/lib/navigation';
import { useResizeObserver } from '@/shared/lib/ui';

import { BOARD_GAP } from '../../constants';

import type { SummaryBoard } from '@/entities/Board';

interface Props {
  boards: SummaryBoard[];
  occupiedWidth: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function ManageBoardsContent(props: Props) {
  const { boards, occupiedWidth, containerRef } = props;

  const tenant = useTenant();
  const { projectId, boardId } = useProject();
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const checkScrollable = (containerWidth: number) => {
    if (!contentRef.current) return;

    let contentWidth = 0;

    const children = Array.from(contentRef.current.children);

    children.forEach(child => (contentWidth += child.clientWidth));

    contentWidth += occupiedWidth + BOARD_GAP * (children.length - 1);

    const isScrollable = contentWidth > containerWidth;

    setShowScrollButtons(isScrollable);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.getBoundingClientRect().width;

    checkScrollable(width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useResizeObserver(viewportRef, entries => {
    const entry = entries[0];

    if (!entry || !contentRef.current || !containerRef.current) return;

    const width = containerRef.current.getBoundingClientRect().width;

    checkScrollable(width);
  });

  const handleScroll = (dir: 'left' | 'right') => {
    if (!viewportRef.current) return;

    const scrollWidth = viewportRef.current.scrollWidth;
    const clientWidth = viewportRef.current.clientWidth;

    const scrollAmount = clientWidth / 2;
    const isScrollable = scrollWidth > clientWidth;

    if (!isScrollable) return;

    viewportRef.current.scrollBy({
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
        viewportRef={viewportRef}
      >
        <div
          ref={contentRef}
          className='flex items-center'
          style={{ gap: `${BOARD_GAP}px` }}
        >
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
