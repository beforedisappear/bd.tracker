import dynamic from 'next/dynamic';

import { CreateProjectTrigger } from '../CreateProjectTrigger/CreateProjectTrigger';

export const LazyCreateProjectMobile = dynamic(
  () => import('./CreateProject.mobile').then(mod => mod.CreateProject),
  { ssr: false, loading: () => <CreateProjectTrigger /> },
);
