'use client';

import { AUTH_FORM_DESC, AUTH_FORM_TITLE } from '@/features/AuthByEmail';
import { Drawer } from '@/shared/ui/c';
import { AuthModalContent } from '../AuthModalContent';

import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

interface Props {
  trigger?: ReactNode;
}

export function AuthModalMobile({}: Props) {
  const { back } = useRouter();

  return (
    <Drawer
      title={AUTH_FORM_TITLE}
      description={AUTH_FORM_DESC}
      onAnimationEnd={back}
      className='h-[24rem]'
      titleClassName='text-center'
      descClassName='text-center whitespace-pre-line'
    >
      <AuthModalContent />
    </Drawer>
  );
}
