'use client';

import { Menu } from 'lucide-react';

import { Button, Sheet } from '@/shared/ui/c';
import { HeaderNavMenu } from '../HeaderNavMenu';

import { SITE_NAME } from '@/shared/constants';

interface Props {}

export function MobileHeaderSheet({}: Props) {
  return (
    <div className='hidden md:flex'>
      <Sheet
        title={SITE_NAME}
        trigger={
          <Button variant='ghost' size='icon' onClick={undefined}>
            <Menu className='flex'>
              <span className='sr-only'>Menu Icon</span>
            </Menu>
          </Button>
        }
      >
        <HeaderNavMenu />
      </Sheet>
    </div>
  );
}
