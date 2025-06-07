import dynamic from 'next/dynamic';

import { CreateProjectTrigger } from '../CreateProjectTrigger/CreateProjectTrigger';

export const LazyCreateProjectDesktop = dynamic(
  () => import('./CreateProject.desktop').then(mod => mod.CreateProject),
  { ssr: false, loading: () => <CreateProjectTrigger /> },
);
