import { Badge } from '@/shared/ui/s';

import { cn } from '@/shared/lib/css';
import { mapColorToClassName } from '../../config';
import type { Sticker } from '../../model/types';
import type { MouseEvent } from 'react';

interface Props {
  data: Sticker;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export function BoardSticker(props: Props) {
  const {
    data: { name, color },
    ...rest
  } = props;

  const stickerColor = mapColorToClassName[color];

  return (
    <Badge
      variant='secondary'
      className={cn('w-fit  hover:bg-initial', stickerColor)}
      {...rest}
    >
      {name}
    </Badge>
  );
}
