import { ViewBoardColumnLoading } from '../ViewBoardColumn/ViewBoardColumn.loading';

export function ViewBoardLoading() {
  return (
    <div className='flex gap-4 h-full'>
      {new Array(4).fill('_').map((_, index) => (
        <ViewBoardColumnLoading key={index} />
      ))}
    </div>
  );
}
