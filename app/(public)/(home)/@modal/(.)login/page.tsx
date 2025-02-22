'use client';

import { AuthByEmail } from '@/features/AuthByEmail';
import { Dialog } from '@/shared/ui/c';
import { useRouter } from 'next/navigation';

interface Props {}

export default function Page({}: Props) {
  const { back } = useRouter();

  return (
    <>
      <Dialog
        title='auth'
        defaultOpen
        onOpenChange={open => (open ? null : back())}
      >
        <AuthByEmail />
      </Dialog>
    </>
  );
}
