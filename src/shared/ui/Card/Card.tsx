import { PropsWithChildren } from 'react';
import { CardContainer } from './CardContainer';
import { CardContent } from './CardContent';
import { CardDescription } from './CardDescription';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardTitle } from './CardTitle';
import { cn } from '@/shared/lib/css';

interface Props extends PropsWithChildren {
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  footerClassName?: string;
}

export function Card(props: Props) {
  const {
    title,
    description,
    children,
    className,
    titleClassName,
    descClassName,
    contentClassName,
    headerClassName,
    headerContent,
    footerContent,
    footerClassName,
  } = props;

  const hasHeader = title || description || headerContent;

  return (
    <CardContainer className={className}>
      {hasHeader && (
        <CardHeader className={cn(headerClassName, 'md:p-4 md:pb-0')}>
          {title && <CardTitle className={titleClassName}>{title}</CardTitle>}

          {description && (
            <CardDescription className={descClassName}>
              {description}
            </CardDescription>
          )}

          {headerContent}
        </CardHeader>
      )}

      {children && (
        <CardContent
          className={cn({ 'pt-6': !hasHeader }, contentClassName, 'md:p-4')}
        >
          {children}
        </CardContent>
      )}

      {footerContent && (
        <CardFooter className={cn(footerClassName, 'md:p-4')}>
          {footerContent}
        </CardFooter>
      )}
    </CardContainer>
  );
}
