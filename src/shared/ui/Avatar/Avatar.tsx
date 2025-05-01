import { AvatarFallback } from '@radix-ui/react-avatar';
import Image from 'next/image';
import { AvatarImage } from './AvatarImage';
import { AvatarContainer } from './AvatarContainer';

import type { ComponentProps } from 'react';

interface Props extends ComponentProps<typeof AvatarContainer> {
  src: string;
  alt: string;
  fallback?: React.ReactNode;
  className?: string;
}

export function Avatar(props: Props) {
  const { src, alt, fallback, className, ...restProps } = props;

  return (
    <AvatarContainer className={className} {...restProps}>
      <AvatarImage asChild src={src}>
        <Image src={src} alt={alt} width={40} height={40} />
      </AvatarImage>
      {fallback && <AvatarFallback asChild>{fallback}</AvatarFallback>}
    </AvatarContainer>
  );
}
