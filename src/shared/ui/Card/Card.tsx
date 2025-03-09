import { PropsWithChildren } from 'react';
import { CardContainer } from './CardContainer';
import { CardContent } from './CardContent';
import { CardDescription } from './CardDescription';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardTitle } from './CardTitle';

interface Props extends PropsWithChildren {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descClassName?: string;
  contentClassName?: string;
  footerContent?: React.ReactNode;
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
    footerContent,
  } = props;

  return (
    <CardContainer className={className}>
      <CardHeader>
        {<CardTitle className={titleClassName}>{title}</CardTitle>}
        {description && (
          <CardDescription className={descClassName}>
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className={contentClassName}>{children}</CardContent>

      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </CardContainer>
  );
}
