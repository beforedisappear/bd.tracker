import { SelectTeamAdvancedItemLoading } from '../SelectTeamAdvancedItem/SelectTeamAdvancedItem.loading';

export function SelectTeamAdvancedLoading() {
  return (
    <div className='flex flex-col gap-2'>
      {new Array(10).fill(null).map((_, index) => (
        <SelectTeamAdvancedItemLoading key={index} />
      ))}
    </div>
  );
}
