import { SelectProjectView } from '@/features/SelectProjectView';
import { FilterTasks } from '@/features/FilterTasks';
import { ProjectView } from '@/widgets/ProjectView';

interface Props {}

export function ProjectByIdPage({}: Props) {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex w-full gap-4 h-8'>
        <SelectProjectView />
        <FilterTasks />
      </div>

      <ProjectView />
    </div>
  );
}
