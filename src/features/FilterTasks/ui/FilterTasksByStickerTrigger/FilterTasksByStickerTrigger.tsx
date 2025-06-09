import { Tag } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';

interface Props extends ButtonProps {}

export function FilterTasksByStickerTrigger(props: Props) {
  return (
    <Button variant={null} size='sm' {...props}>
      <Tag />
      <span>Метка</span>
    </Button>
  );
}
