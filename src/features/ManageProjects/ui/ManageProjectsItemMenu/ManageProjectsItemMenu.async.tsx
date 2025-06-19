import dynamic from 'next/dynamic';
import { ManageProjectsItemMenuTrigger } from '../ManageProjectsItemMenuTrigger/ManageProjectsItemMenuTrigger';

export const LazyManageProjectsItemMenu = dynamic(
  () =>
    import('./ManageProjectsItemMenu').then(mod => mod.ManageProjectsItemMenu),
  { ssr: false, loading: () => <ManageProjectsItemMenuTrigger /> },
);
