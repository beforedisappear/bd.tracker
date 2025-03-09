import {
  AUTH_FORM_DESC,
  AUTH_FORM_TITLE,
  AuthByEmail,
} from '@/features/AuthByEmail';
import { Drawer } from '@/shared/ui/c';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {}

export function MobileAuthModal({}: Props) {
  const { back } = useRouter();

  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    setShowDrawer(true);
  }, []);

  return (
    <Drawer
      title={AUTH_FORM_TITLE}
      description={AUTH_FORM_DESC}
      open={showDrawer}
      onOpenChange={setShowDrawer}
      onAnimationEnd={back}
      className='h-[20rem]'
      // className='min-h-[17rem] h-auto w-full max-w-[25rem]
      //   md:max-w-[22rem]'
      titleClassName='text-center'
      descClassName='text-center whitespace-pre-line'
    >
      <AuthByEmail />
    </Drawer>
  );
}
