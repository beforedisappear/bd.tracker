export const getCurrentPath = (path: string) => {
  return path.replace(/^\/mobile|\/desktop/, '');
};

export const getPathTail = (path: string) => {
  const pathParts = path.split('/').filter(Boolean);
  const route = pathParts[pathParts.length - 1];
  return `/${route}`;
};
