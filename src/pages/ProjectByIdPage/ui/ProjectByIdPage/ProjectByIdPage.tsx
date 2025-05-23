import { SelectProjectView } from '@/features/SelectProjectView';
import { FilterTasks } from '@/features/FilterTasks';
import { ProjectView } from '@/widgets/ProjectView';

interface Props {}

export function ProjectByIdPage({}: Props) {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex gap-4'>
        <SelectProjectView />
        <FilterTasks />
      </div>

      <ProjectView />
    </div>
  );
}
