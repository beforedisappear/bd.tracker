import { cn } from '@/shared/lib/css';

import { PropsWithChildren } from 'react';
import { Card } from '../Card/Card';

interface Props extends PropsWithChildren {
  title: string;
  description: string;
  avatar: React.ReactNode;
  className?: string;
}

export function CommentCard(props: Props) {
  const { avatar, children, title, description, className } = props;

  return (
    <Card
      title={title}
      titleClassName='text-lg order-2 col-start-2 row-start-1'
      description={description}
      descClassName='order-3 col-start-2 row-start-1 self-end'
      className={cn(
        `drop-shadow-xl shadow-black/10 dark:shadow-white/10`,
        className,
      )}
      headerClassName='grid grid-cols-[auto_1fr] gap-4'
      headerContent={avatar}
    >
      {children}
    </Card>
  );
}
