import { ManageProjectsItemLoading } from '../ManageProjectsItem/ManageProjectsItem.loading';

import { MANAGE_PROJECTS_LOADING_ITEMS_COUNT } from '../../config';

export function ManageProjectsLoading() {
  return (
    <div className='flex flex-wrap gap-3'>
      {Array.from({ length: MANAGE_PROJECTS_LOADING_ITEMS_COUNT }).map(
        (_, index) => (
          <ManageProjectsItemLoading key={index} />
        ),
      )}
    </div>
  );
}
