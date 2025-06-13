import { cn } from '@/shared/lib/css';
import { mapColorToClassName } from '../../config';
import type { Sticker } from '../../model/types';
import { Badge } from '@/shared/ui/s';

interface Props {
  data: Sticker;
}

export function BoardSticker(props: Props) {
  const {
    data: { name, color },
  } = props;

  const stickerColor = mapColorToClassName[color];

  return (
    <Badge
      variant='secondary'
      className={cn('w-fit  hover:bg-initial', stickerColor)}
    >
      {name}
    </Badge>
  );
}
