import type { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export function PrivateRootLayout({ children }: IProps) {
  return (
    <div>
      <span>PrivateRootLayout</span>
      {children}
    </div>
  );
}
