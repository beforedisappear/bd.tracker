'use client';

import { LazyManageProjectMembersDesktop } from './ManageProjectMembers.desktop.async';
import { LazyManageProjectMembersMobile } from './ManageProjectMembers.mobile.async';

import { useDeviceType } from '@/shared/lib/deviceType/c';

export function ManageProjectMembers() {
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <>
      {isDesktop && <LazyManageProjectMembersDesktop />}
      {isMobile && <LazyManageProjectMembersMobile />}
    </>
  );
}
