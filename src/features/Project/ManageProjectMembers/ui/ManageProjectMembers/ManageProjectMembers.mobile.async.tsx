'use client';

import dynamic from 'next/dynamic';

export const LazyManageProjectMembersMobile = dynamic(
  () =>
    import('./ManageProjectMembers.mobile').then(
      mod => mod.ManageProjectMembersMobile,
    ),
  { ssr: false },
);
