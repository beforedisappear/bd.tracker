export { boardQueries, columnQueries, taskQueries } from './api';

export {
  BoardStoreProvider,
  useBoardStore,
  type BoardStore,
} from './model/store';
export { getDeleteBoardModal } from './model/selectors/getDeleteBoardModal';
export { getDeleteColumnModal } from './model/selectors/getDeleteColumnModal';
export { getCreateTaskModal } from './model/selectors/getCreateTaskModal';
export { getMapColorTaskFilterByBoardId } from './model/selectors/getMapColorTaskFilterByBoardId';
export { getMapAssigneesTaskFilterByBoardId } from './model/selectors/getMapAssigneesTaskFilterByBoardId';
export { getMapDateTaskFilterByBoardId } from './model/selectors/getMapDateTaskFilterByBoardId';

export { BoardTaskColorsInput } from './ui/BoardTaskColorsInput/BoardTaskColorsInput';

export { mapColorToClassName } from './config';

export type {
  SummaryBoard,
  Board,
  Column,
  Task,
  GetAllBoardsDtoRes,
  Color,
} from './model/types';
