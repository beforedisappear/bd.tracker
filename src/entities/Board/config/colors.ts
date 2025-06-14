import type { Color } from '../model/types/color';

export const mapColorToClassName: Record<Color, string> = {
  SLATE: 'bg-slate-200 dark:bg-slate-900',
  ROSE: 'bg-rose-200 dark:bg-rose-900',
  AMBER: 'bg-amber-200 dark:bg-amber-900',
  YELLOW: 'bg-yellow-200 dark:bg-yellow-900',
  LIME: 'bg-lime-200 dark:bg-lime-900',
  GREEN: 'bg-green-200 dark:bg-green-900',
  TEAL: 'bg-teal-200 dark:bg-teal-900',
  SKY: 'bg-sky-200 dark:bg-sky-900',
  INDIGO: 'bg-indigo-200 dark:bg-indigo-900',
  VIOLET: 'bg-violet-200 dark:bg-violet-900',
  GRAY: 'bg-card',
  RED: 'bg-red-200 dark:bg-red-900',
  ORANGE: 'bg-orange-200 dark:bg-orange-900',
  EMERALD: 'bg-emerald-200 dark:bg-emerald-900',
};
