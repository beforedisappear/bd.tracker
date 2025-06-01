import { Users } from 'lucide-react';

import { DropdownMenu } from '@/shared/ui/c';
import { SetupProjectMenuTrigger } from '../SetupProjectMenuTrigger/SetupProjectMenuTrigger';

import {
  getProjectMembersModal,
  getCurrentTeamProjectId,
} from '@/entities/Project';
import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';
import { useProject } from '@/shared/lib/navigation';

export function SetupProjectMenu() {
  const { projectId } = useProject();
  const { setShowProjectMembersModal } = usePrivateGlobalStore(
    getProjectMembersModal(),
  );

  const { setCurrentProjectId } = usePrivateGlobalStore(
    getCurrentTeamProjectId(),
  );

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
      contentProps={{ side: 'right', align: 'start' }}
    />
  );
}
