import { SelectProjectView } from '@/features/SelectProjectView';
import { ProjectView } from '@/widgets/ProjectView';
import { TaskFilters } from '@/widgets/TaskFilters';
interface Props {}

export function ProjectByIdPage({}: Props) {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex w-full gap-4 h-8'>
        <SelectProjectView />
        <TaskFilters />
      </div>

      <ProjectView />
    </div>
  );
}
