export const getCleanPath = (path: string) => {
  return path.replace(/^\/mobile|\/desktop/, '');
};
