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
        <CardHeader className={headerClassName}>
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
        <CardContent className={cn({ 'pt-6': !hasHeader }, contentClassName)}>
          {children}
        </CardContent>
      )}

      {footerContent && (
        <CardFooter className={footerClassName}>{footerContent}</CardFooter>
      )}
    </CardContainer>
  );
}
