import { SetupProjectMenu } from '../SetupProjectMenu/SetupProjectMenu';
import { SetupProjectTitle } from '../SetupProjectTitle/SetupProjectTitle';

export function SetupProjectMobile() {
  return (
    <div className='flex items-center gap-2'>
      <SetupProjectTitle />
      <SetupProjectMenu />
    </div>
  );
}
