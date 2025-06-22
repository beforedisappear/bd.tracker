import { DEFAULT_TASK_GAP, DEFAULT_COLUMN_GAP } from '../../constants';

type Args = {
  type?: 'task' | 'column';
  prev?: number;
  next?: number;
};

export function computeOrder(args: Args): number {
  const { prev, next, type = 'task' } = args;

  const DEFAULT_STEP = type === 'task' ? DEFAULT_TASK_GAP : DEFAULT_COLUMN_GAP;

  // Вставка в начало
  if (prev === undefined && next !== undefined) {
    return next - DEFAULT_STEP;
  }

  // Вставка в конец
  if (prev !== undefined && next === undefined) {
    return prev + DEFAULT_STEP;
  }

  // Вставка между двумя
  if (prev !== undefined && next !== undefined) {
    return Math.floor((prev + next) / 2);
  }

  // Первая колонка вообще
  return 0;
}
