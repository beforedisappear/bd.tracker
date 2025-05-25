import { Settings } from 'lucide-react';

import { Button } from '@/shared/ui/c';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

// TODO: add mobile version
// TODO: mb it's better to use another way
export function ManageProjectMembers({ children }: Props) {
  return (
    <div className='flex items-center gap-2'>
      {children}
      <Button variant={'ghost'} className='p-0 h-6 w-6'>
        <Settings className='h-4 w-4' />
      </Button>
    </div>
  );
}
