export const getInitials = (name: string) => {
  const letters = name.split(' ').slice(0, 2);
  return letters.map(el => el[0].toUpperCase()).join('');
};
