export const getRandomCode = (code?: string) => {
  const forbidden = Number(code || 1);

  let newCode: number;

  do {
    newCode = Math.floor(100000 + Math.random() * 900000);
  } while (newCode === forbidden);

  return newCode.toString();
};
