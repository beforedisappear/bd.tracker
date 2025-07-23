'use client';

import dynamic from 'next/dynamic';

export const LazyManageProjectMembersDesktop = dynamic(
  () =>
    import('./ManageProjectMembers.desktop').then(
      mod => mod.ManageProjectMembersDesktop,
    ),
  { ssr: false },
);
