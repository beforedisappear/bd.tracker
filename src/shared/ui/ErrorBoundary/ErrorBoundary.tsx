'use client'; // Error components must be Client Components

import { cn } from '@/shared/lib/css';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../c';
import { useEffect } from 'react';

interface Props {
  title?: string;
  description?: string;
  className?: string;
  error?: Error | null;
  reset?: () => void;
  children?: React.ReactNode;
}

export function ErrorBoundary(props: Props) {
  const {
    title = 'Непредвиденная ошибка',
    description = 'При обработке вашего запроса произошла ошибка',
    className,
    // children,
    error,
    reset,
  } = props;

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-4 text-center max-w-72',
        className,
      )}
    >
      <AlertCircle className='h-6 w-6 text-destructive mb-2' />
      <h2 className='text-lg font-semibold'>{title}</h2>
      <p className='text-sm text-muted-foreground mb-3'>{description}</p>
      {reset && (
        <Button onClick={reset} size='sm' variant='outline'>
          <RefreshCw className='mr-2 h-4 w-4' />
          <span>Попробовать снова</span>
        </Button>
      )}
      {/* {children} */}
    </div>
  );
}
