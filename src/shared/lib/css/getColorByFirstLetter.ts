const getColorByFirstLetter = (name: string) => {
  const colors = [
    '#FF6B6B', // A-D
    '#4ECDC4', // E-H
    '#45B7D1', // I-L
    '#96CEB4', // M-P
    '#D4A5A5', // Q-T
    '#9B59B6', // U-X
    '#3498DB', // Y-Z
  ];

  const firstChar = name.charAt(0);

  if (/[0-9]/.test(firstChar)) {
    return '#E67E22';
  }

  const firstLetter = firstChar.toUpperCase();
  const charCode = firstLetter.charCodeAt(0);

  const index = Math.floor((charCode - 65) / 4);

  return colors[Math.min(index, colors.length - 1)];
};

export { getColorByFirstLetter };
