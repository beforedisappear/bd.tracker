import { Button } from '@/shared/ui/c';
import { Settings } from 'lucide-react';

import type { ComponentProps } from 'react';

interface Props extends ComponentProps<typeof Button> {}

export function SetupProjectMenuTrigger(props: Props) {
  return (
    <Button {...props} variant='ghost' className='p-0 h-6 w-6'>
      <Settings className='h-4 w-4' />
    </Button>
  );
}
