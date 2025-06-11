import { AvatarFallback } from '@radix-ui/react-avatar';
import Image, { type StaticImageData } from 'next/image';
import { AvatarImage } from './AvatarImage';
import { AvatarContainer } from './AvatarContainer';

import type { ComponentProps } from 'react';
import { getInitials } from '@/shared/lib/data';
import { getColorByFirstLetter } from '@/shared/lib/css';

interface Props extends ComponentProps<typeof AvatarContainer> {
  src: string | StaticImageData;
  alt: string;
  fallback?: React.ReactNode;
  height?: number;
  width?: number;
  avatarClassName?: string;
  className?: string;
  initials?: string;
}

export function Avatar(props: Props) {
  const {
    src,
    alt,
    fallback,
    className,
    avatarClassName,
    height = 40,
    width = 40,
    initials,
    style,
    ...restProps
  } = props;

  return (
    <AvatarContainer
      className={className}
      style={{
        backgroundColor: initials ? getColorByFirstLetter(initials) : undefined,
        ...style,
      }}
      {...restProps}
    >
      <AvatarImage asChild src={typeof src === 'string' ? src : src.src}>
        <Image src={src} alt={alt} width={width} height={height} />
      </AvatarImage>

      {fallback && (
        <AvatarFallback className={avatarClassName}>{fallback}</AvatarFallback>
      )}

      {initials && (
        <AvatarFallback className={avatarClassName}>
          {getInitials(initials)}
        </AvatarFallback>
      )}
    </AvatarContainer>
  );
}
