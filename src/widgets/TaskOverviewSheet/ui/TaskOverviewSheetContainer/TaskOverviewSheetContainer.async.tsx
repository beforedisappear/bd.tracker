import dynamic from 'next/dynamic';
import { TaskOverviewSheetContainerLoading } from './TaskOverviewSheetContainer.loading';

export const LazyTaskOverviewSheetContainer = dynamic(
  () =>
    import('./TaskOverviewSheetContainer').then(
      mod => mod.TaskOverviewSheetContainer,
    ),
  { ssr: false, loading: () => <TaskOverviewSheetContainerLoading /> },
);
