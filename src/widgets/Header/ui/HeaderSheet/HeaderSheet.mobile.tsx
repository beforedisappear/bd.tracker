'use client';

import { Menu } from 'lucide-react';

import { Button, Sheet } from '@/shared/ui/c';
import { HeaderNavMenuMobile } from '../HeaderNavMenu';

import { useState, useCallback } from 'react';

import { SITE_NAME } from '@/shared/constants';

interface Props {}

export function HeaderSheetMobile({}: Props) {
  const [showSheet, setShowSheet] = useState(false);

  const onSetShowSheet = useCallback(
    (state: boolean) => setShowSheet(state),
    [],
  );

  return (
    <div className='flex'>
      <Sheet
        open={showSheet}
        onOpenChange={setShowSheet}
        title={SITE_NAME}
        trigger={
          <Button variant='ghost' size='icon' onClick={undefined}>
            <Menu className='flex'>
              <span className='sr-only'>Menu Icon</span>
            </Menu>
          </Button>
        }
      >
        <HeaderNavMenuMobile onSetShowSheet={onSetShowSheet} />
      </Sheet>
    </div>
  );
}
