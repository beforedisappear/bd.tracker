import {
  DEFAULT_TASK_ORDER_GAP,
  DEFAULT_COLUMN_ORDER_GAP,
} from '../../constants';

type Args = {
  type?: 'task' | 'column';
  prev?: number;
  next?: number;
};

export function calculateOrder(args: Args): number {
  const { prev, next, type = 'task' } = args;

  const DEFAULT_STEP =
    type === 'task' ? DEFAULT_TASK_ORDER_GAP : DEFAULT_COLUMN_ORDER_GAP;

  if (prev === undefined && next !== undefined) {
    return next - DEFAULT_STEP;
  }

  if (prev !== undefined && next === undefined) {
    return prev + DEFAULT_STEP;
  }

  if (prev !== undefined && next !== undefined) {
    return Math.floor((prev + next) / 2);
  }

  return 0;
}
