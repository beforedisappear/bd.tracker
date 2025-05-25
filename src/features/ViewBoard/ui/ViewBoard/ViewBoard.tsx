import { ViewBoardColumn } from '../ViewBoardColumn/ViewBoardColumn';
import { ViewBoardTask } from '../ViewBoardTask/ViewBoardTask';

export function ViewBoard() {
  return (
    <div className='flex gap-4 h-full overflow-x-auto pb-4'>
      <ViewBoardColumn title='To Do' count={3}>
        <ViewBoardTask title='Изучить TypeScript' />
        <ViewBoardTask title='Изучить React' />
        <ViewBoardTask title='Изучить Next.js' />
      </ViewBoardColumn>

      <ViewBoardColumn title='In Progress' count={1}>
        <ViewBoardTask title='Изучить JavaScript' />
      </ViewBoardColumn>

      <ViewBoardColumn title='Done' count={2}>
        <ViewBoardTask title='Изучить CSS' />
        <ViewBoardTask title='Изучить HTML' />
      </ViewBoardColumn>
    </div>
  );
}
