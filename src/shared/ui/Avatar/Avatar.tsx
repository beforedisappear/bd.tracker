import { AvatarFallback } from '@radix-ui/react-avatar';
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
      <AvatarImage src={src} alt={alt} />
      {fallback && <AvatarFallback asChild>{fallback}</AvatarFallback>}
    </AvatarContainer>
  );
}
