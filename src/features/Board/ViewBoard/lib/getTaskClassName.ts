import { mapColorToClassName, type Color } from '@/entities/Board';

export const getTaskClassName = (color: Color) =>
  `flex flex-col gap-6 min-h-fit w-72 h-auto justify-between rounded-md ${mapColorToClassName[color]} p-3 shadow-sm border`;
