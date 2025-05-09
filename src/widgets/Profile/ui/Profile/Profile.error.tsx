import { cn } from '@/shared/lib/css';

import { ErrorBoundary } from '@/shared/ui/c';
import { Card } from '@/shared/ui/s';

import { getProfileBlockClassName } from '../../config';

interface Props {
  error: Error | null;
  refetch: () => void;
}

export const ProfileError = ({ error, refetch }: Props) => {
  return (
    <Card className={cn(getProfileBlockClassName(), 'grid place-items-center')}>
      <ErrorBoundary error={error} reset={refetch} />
    </Card>
  );
};
