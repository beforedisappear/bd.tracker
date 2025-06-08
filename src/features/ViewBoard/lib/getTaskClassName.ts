import { mapColorToClassName, type Color } from '@/entities/Board';

export const getTaskClassName = (color: Color) =>
  `flex flex-col gap-2 min-h-24 h-auto justify-between rounded-md ${mapColorToClassName[color]} p-3 shadow-sm border`;
