import { ManageProjectsItemPlaceholder } from '../ManageProjectsItem/ManageProjectsItem.placeholder';

import { MANAGE_PROJECTS_LOADING_ITEMS_COUNT } from '../../constants';

export function ManageProjectsPlaceholder() {
  return (
    <div className='flex flex-wrap gap-3'>
      {Array.from({ length: MANAGE_PROJECTS_LOADING_ITEMS_COUNT }).map(
        (_, index) => (
          <ManageProjectsItemPlaceholder key={index} />
        ),
      )}
    </div>
  );
}
