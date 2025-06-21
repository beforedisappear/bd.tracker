import { Users } from 'lucide-react';

import { DropdownMenu } from '@/shared/ui/c';
import { SetupProjectMenuTrigger } from '../SetupProjectMenuTrigger/SetupProjectMenuTrigger';

import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';
import { useProject } from '@/shared/lib/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';

import { getProjectMembersModalActions } from '@/entities/Project';

export function SetupProjectMenu() {
  const { isMobile } = useDeviceType();
  const { projectId } = useProject();

  const { setShowProjectMembersModal, setCurrentProjectId } =
    usePrivateGlobalStore(getProjectMembersModalActions());

  const onShowProjectMembersModal = () => {
    setCurrentProjectId(projectId);
    setShowProjectMembersModal(true);
  };

  return (
    <DropdownMenu
      trigger={<SetupProjectMenuTrigger />}
      options={[
        {
          type: 'item',
          label: { text: 'Участники проекта', icon: <Users /> },
          onSelect: onShowProjectMembersModal,
        },
      ]}
      contentProps={{
        side: isMobile ? 'bottom' : 'right',
        align: isMobile ? 'center' : 'start',
      }}
    />
  );
}
