'use client';

import {
  AUTH_FORM_DESC,
  AUTH_FORM_TITLE,
  AuthByEmail,
} from '@/features/AuthByEmail';
import { Dialog } from '@/shared/ui/c';

import { useRouter } from 'next/navigation';

import type { ReactNode } from 'react';

interface Props {
  trigger?: ReactNode;
}

export function AuthModalDesktop({ trigger }: Props) {
  const { back } = useRouter();

  return (
    <Dialog
      title={AUTH_FORM_TITLE}
      trigger={trigger}
      description={AUTH_FORM_DESC}
      onOpenChange={open => (open ? null : back())}
      defaultOpen
      className='h-auto w-full max-w-[25rem]
        md:max-w-[22rem]'
      titleClassName='text-center'
      descClassName='text-center whitespace-pre-line'
    >
      <AuthByEmail />
    </Dialog>
  );
}
